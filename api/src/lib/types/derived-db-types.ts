import { ColumnType, Kysely } from "kysely"
import * as schema from "zapatos/schema"
import { Primitive } from "type-fest"
import { JSONValue } from "zapatos/db"

type ZapatosInsertableTypeToPrimitive<T> = Exclude<
  Extract<T, Primitive | Date | JSONValue>,
  symbol
>

export type ZapatosTableNameToKyselySchema<T extends schema.Table> = {
  [K in keyof schema.SelectableForTable<T>]: ColumnType<
    ZapatosInsertableTypeToPrimitive<schema.SelectableForTable<T>[K]>,
    K extends keyof schema.InsertableForTable<T>
      ? ZapatosInsertableTypeToPrimitive<schema.InsertableForTable<T>[K]>
      : never,
    K extends keyof schema.UpdatableForTable<T>
      ? ZapatosInsertableTypeToPrimitive<schema.UpdatableForTable<T>[K]>
      : never
  >
}

export type KyselySchema = {
  readonly [T in schema.Table]: ZapatosTableNameToKyselySchema<T>
}

export type KyselyDatabaseInstance = Kysely<KyselySchema>
