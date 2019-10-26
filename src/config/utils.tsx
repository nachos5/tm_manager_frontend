// fall til að sækja id intið úr graphql id base64 streng
export function extractIntFromId(id: string): number {
  // er á formattinu 'schema:id'
  const decoded = atob(id);
  return parseInt(decoded.split(':')[1], 10);
}

// fall til að encode-a schema og id saman í base64 streng
export function encodeBase64(schema: string, id: number): string {
  const encoded: string = btoa(`${schema}:${id}`);
  return encoded;
}
