/**
 * Utilidades para manejo de tokens JWT
 */

export class TokenUtil {
  /**
   * Decodifica un token JWT sin verificar la firma
   * @param token Token JWT a decodificar
   * @returns Payload decodificado o null si es inválido
   */
  static decodeToken(token: string): any {
    try {
      if (!token || token === 'null' || token === 'undefined') {
        return null;
      }

      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('❌ Token JWT malformado');
        return null;
      }

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('❌ Error al decodificar token:', error);
      return null;
    }
  }

  /**
   * Verifica si un token ha expirado
   * @param token Token JWT a verificar
   * @returns true si está expirado, false si es válido
   */
  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    
    if (!decoded || !decoded.exp) {
      return true;
    }

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();
    
    return expirationDate < now;
  }

  /**
   * Obtiene el token del localStorage y lo valida
   * @returns Token válido o null
   */
  static getValidToken(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token || token === 'null' || token === 'undefined') {
      return null;
    }

    if (this.isTokenExpired(token)) {
      console.warn('⚠️ Token expirado');
      this.clearSession();
      return null;
    }

    return token;
  }

  /**
   * Obtiene información del usuario desde el token
   * @returns Datos del usuario o null
   */
  static getUserFromToken(): any {
    const token = this.getValidToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded ? {
      id: decoded.id || decoded.userId || decoded.sub,
      email: decoded.email,
      nombre: decoded.nombre || decoded.name,
      rol: decoded.rol || decoded.role,
      exp: decoded.exp
    } : null;
  }

  /**
   * Limpia la sesión del usuario
   */
  static clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
  }

  /**
   * Guarda el token de forma segura
   * @param token Token JWT a guardar
   */
  static saveToken(token: string): void {
    if (!token || token === 'null' || token === 'undefined') {
      console.error('❌ Intento de guardar token inválido');
      return;
    }

    // Verificar que sea un JWT válido
    const decoded = this.decodeToken(token);
    if (!decoded) {
      console.error('❌ Token JWT inválido, no se guardará');
      return;
    }

    localStorage.setItem('token', token);
    console.log('✅ Token guardado correctamente');
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param requiredRole Rol requerido
   * @returns true si el usuario tiene el rol
   */
  static hasRole(requiredRole: string): boolean {
    const user = this.getUserFromToken();
    if (!user || !user.rol) return false;

    return user.rol.toLowerCase() === requiredRole.toLowerCase();
  }

  /**
   * Obtiene el tiempo restante hasta la expiración del token
   * @returns Minutos restantes o null si no hay token
   */
  static getTimeUntilExpiration(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return null;

    const expirationDate = new Date(decoded.exp * 1000);
    const now = new Date();
    const diffMs = expirationDate.getTime() - now.getTime();
    
    return Math.floor(diffMs / 1000 / 60); // Minutos
  }
}
