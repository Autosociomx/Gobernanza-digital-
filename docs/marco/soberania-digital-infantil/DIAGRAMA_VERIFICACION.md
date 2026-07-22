# Diagramas de flujo — Llave Digital de Protección a la Niñez (IDBJ)

Diagramas para presentar a autoridades. Renderizan directamente en GitHub
(Mermaid).

## 1. Activación de la Llave (una sola vez, presencial)

```mermaid
flowchart TD
    A[Tutor acude a sucursal del Banco del Bienestar<br/>o mesa de atención escolar en 'Lunes de becas'] --> B{Presenta INE del tutor<br/>+ CURP del menor}
    B -->|Vínculo no acreditado| C[Se orienta al tutor:<br/>documentos de patria potestad o tutela]
    C --> B
    B -->|Vínculo acreditado| D[Se genera par de claves criptográficas<br/>La clave privada queda SOLO en el dispositivo del tutor]
    D --> E{¿Tutor tiene smartphone?}
    E -->|Sí| F[App 'Llave Digital' con perfil del menor<br/>y código QR dinámico]
    E -->|No| G[Código impreso recargable<br/>en ventanilla del Banco del Bienestar]
    F --> H[Llave activa]
    G --> H
    H -.->|Candado legal| I[La activación es voluntaria y gratuita.<br/>NUNCA condiciona la beca.]
```

## 2. Verificación de edad ante una plataforma (doble anonimato)

```mermaid
sequenceDiagram
    autonumber
    participant M as Menor
    participant P as Plataforma digital
    participant T as App del tutor
    participant S as SINISI (Estado)

    M->>P: Intenta crear una cuenta
    P->>M: Muestra botón "Verificar mi edad con el gobierno de México" + QR de solicitud
    M->>T: Pide a su tutor escanear el QR
    T->>S: Solicitud firmada con la clave del tutor
    S->>S: Valida vínculo tutor-menor y edad<br/>(el padrón NUNCA sale del Estado)
    S-->>T: Solicita confirmación del tutor
    T->>S: Tutor autoriza (o rechaza)
    S->>P: Token anónimo firmado:<br/>"menor de 16: sí/no" + "autorizado por tutor: sí/no"
    Note over P: La plataforma NUNCA ve CURP, nombre,<br/>domicilio, escuela ni fotografía
    P->>M: Cuenta creada con configuración<br/>de máxima privacidad por defecto
```

## 3. Revocación y ciclo de vida del consentimiento

```mermaid
flowchart LR
    A[Llave activa] --> B[Tutor autoriza cuenta<br/>en plataforma X]
    B --> C[Cuenta operando]
    C --> D{Tutor revoca<br/>desde su app}
    D -->|Sí| E[SINISI notifica a la plataforma<br/>Token invalidado]
    E --> F[Plataforma suspende la cuenta<br/>obligación legal, plazo 24 h]
    C --> G{Menor cumple 18}
    G -->|Sí| H[La Llave expira<br/>El titular asume control pleno]
    A --> I{Cambio de tutoría<br/>custodia, fallecimiento}
    I --> J[Actualización SOLO presencial<br/>en mesa de atención estatal]
    J --> A
```

## 4. Denuncia 24/7 (Agencia Nacional de Protección Digital)

```mermaid
flowchart TD
    A[Familia, docente o el propio menor<br/>presenta denuncia 24/7] --> B[Agencia Nacional de Protección Digital]
    B --> C{Clasificación}
    C -->|Contenido dañino| D[Orden de retiro a la plataforma<br/>plazo máximo: 24 horas]
    C -->|Posible delito<br/>grooming, extorsión| E[Oficial de enlace estatal<br/>coordina con fiscalía local]
    C -->|Incumplimiento de plataforma| F[Procedimiento de sanción<br/>+ auditoría de algoritmos]
    D --> G[Seguimiento y cierre<br/>con notificación a la familia]
    E --> G
    F --> G
```
