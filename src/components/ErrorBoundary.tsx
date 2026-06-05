import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorMessage = 'Ha ocurrido un error inesperado.';
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error && parsed.operationType) {
            errorMessage = `Error de Gobernanza Digital: ${parsed.error} (${parsed.operationType} en ${parsed.path})`;
            isFirestoreError = true;
          }
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
          <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="text-red-500" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
              Interrupción de Sistema
            </h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              {errorMessage}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full bg-nayarit-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all"
            >
              <RefreshCw size={20} />
              Reiniciar Protocolo
            </button>
            {isFirestoreError && (
              <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                Error de Integridad de Datos Detectado
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
