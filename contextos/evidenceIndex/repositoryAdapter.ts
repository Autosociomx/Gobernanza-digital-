/**
 * Adaptador de entrada para la lista permitida del repositorio.
 *
 * Es deliberadamente distinto del Evidence Index: éste puede leer sólo los
 * documentos declarados en allowlist.ts y devuelve contenido únicamente al
 * constructor del índice. No descarga red, no acepta rutas dinámicas ni guarda
 * estado. Context.OS debe autorizar y persistir cualquier uso posterior.
 */
import { readFile, realpath } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import { REPOSITORY_EVIDENCE_ALLOWLIST, type AllowlistedRepositorySource } from './allowlist';
import type { EvidenceSourceInput } from './contracts';

export interface RepositoryEvidenceReader {
  readText(absolutePath: string): Promise<string>;
  realPath(absolutePath: string): Promise<string>;
}

const nodeReader: RepositoryEvidenceReader = {
  readText: (absolutePath) => readFile(absolutePath, 'utf8'),
  realPath: (absolutePath) => realpath(absolutePath),
};

function isWithin(root: string, candidate: string): boolean {
  const pathFromRoot = relative(root, candidate);
  return pathFromRoot !== '' && !pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== '..';
}

function toEvidenceInput(
  source: AllowlistedRepositorySource,
  content: string,
  sourceVersion: string,
): EvidenceSourceInput {
  return {
    ref: source.ref,
    kind: source.kind,
    status: source.status,
    sourceVersion,
    content,
  };
}

/**
 * Lee solamente la allowlist cerrada desde un checkout local conocido.
 * `sourceVersion` debe ser el commit o versión entregado por el custodio; nunca
 * se infiere de una rama mutable.
 */
export async function loadAllowlistedRepositoryEvidence(
  repositoryRoot: string,
  sourceVersion: string,
  reader: RepositoryEvidenceReader = nodeReader,
): Promise<readonly EvidenceSourceInput[]> {
  if (!sourceVersion.trim()) throw new Error('SOURCE_VERSION_REQUIRED');

  const canonicalRoot = await reader.realPath(resolve(repositoryRoot));
  const loaded: EvidenceSourceInput[] = [];

  for (const source of REPOSITORY_EVIDENCE_ALLOWLIST) {
    const requestedPath = resolve(canonicalRoot, source.path);
    if (!isWithin(canonicalRoot, requestedPath)) throw new Error('ALLOWLIST_PATH_OUTSIDE_ROOT');

    const canonicalPath = await reader.realPath(requestedPath);
    if (!isWithin(canonicalRoot, canonicalPath)) throw new Error('ALLOWLIST_SYMLINK_OUTSIDE_ROOT');

    loaded.push(toEvidenceInput(source, await reader.readText(canonicalPath), sourceVersion));
  }

  return loaded;
}
