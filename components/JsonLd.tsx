import Script from 'next/script';
import { WithContext, Thing } from 'schema-dts';

interface JsonLdProps<T extends Thing> {
  schema: WithContext<T>;
  id?: string;
}

export function JsonLd<T extends Thing>({ schema, id }: JsonLdProps<T>) {
  return (
    <Script
      id={id || `json-ld-${schema['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}