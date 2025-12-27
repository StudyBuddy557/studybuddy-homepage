'use client';

import { WithContext, Thing } from 'schema-dts';

type Props = {
  schema: WithContext<Thing>;
};

export default function Schema({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}