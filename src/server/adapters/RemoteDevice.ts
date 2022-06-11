export interface RemoteDevice {
  open(options: any): Promise<void>;
  close(): Promise<void>;
  getType(): Promise<'window' | 'frame'>;
  getSession(): Promise<string>;
  getSessions(): Promise<string[]>;
  setSession(sessionId: string): Promise<void>;
  execute(expression: string, options: {}, args: any[]): Promise<any>;
}
