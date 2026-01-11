export type Validator = (value: string) => string | null;

export const validators: Record<string, Validator> = {
  id: (v) => (!v ? 'ID is required' : null),
  name: (v) => (v.length < 2 ? 'Name too short' : null),
  role: (v) => (!['Admin', 'User', 'Viewer'].includes(v) ? 'Invalid role' : null),
};
