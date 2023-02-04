/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos, and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2022 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 104 }


  /* === schema: public === */

  /* --- enums --- */
  /* (none) */

  /* --- tables --- */

  /**
   * **migrations**
   * - Table in database
   */
  export namespace migrations {
    export type Table = 'migrations';
    export interface Selectable {
      /**
      * **migrations.id**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      id: number;
      /**
      * **migrations.name**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      name: string;
      /**
      * **migrations.hash**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      hash: string;
      /**
      * **migrations.executed_at**
      * - `timestamp` in database
      * - Nullable, default: `CURRENT_TIMESTAMP`
      */
      executed_at: Date | null;
    }
    export interface JSONSelectable {
      /**
      * **migrations.id**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      id: number;
      /**
      * **migrations.name**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      name: string;
      /**
      * **migrations.hash**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      hash: string;
      /**
      * **migrations.executed_at**
      * - `timestamp` in database
      * - Nullable, default: `CURRENT_TIMESTAMP`
      */
      executed_at: db.TimestampString | null;
    }
    export interface Whereable {
      /**
      * **migrations.id**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **migrations.name**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **migrations.hash**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      hash?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **migrations.executed_at**
      * - `timestamp` in database
      * - Nullable, default: `CURRENT_TIMESTAMP`
      */
      executed_at?: (db.TimestampString | Date) | db.Parameter<(db.TimestampString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampString | Date) | db.Parameter<(db.TimestampString | Date)> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **migrations.id**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      id: number | db.Parameter<number> | db.SQLFragment;
      /**
      * **migrations.name**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      name: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **migrations.hash**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      hash: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **migrations.executed_at**
      * - `timestamp` in database
      * - Nullable, default: `CURRENT_TIMESTAMP`
      */
      executed_at?: (db.TimestampString | Date) | db.Parameter<(db.TimestampString | Date)> | null | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **migrations.id**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      id?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
      /**
      * **migrations.name**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **migrations.hash**
      * - `varchar` in database
      * - `NOT NULL`, no default
      */
      hash?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **migrations.executed_at**
      * - `timestamp` in database
      * - Nullable, default: `CURRENT_TIMESTAMP`
      */
      executed_at?: (db.TimestampString | Date) | db.Parameter<(db.TimestampString | Date)> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampString | Date) | db.Parameter<(db.TimestampString | Date)> | null | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = 'migrations_name_key' | 'migrations_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **student**
   * - Table in database
   */
  export namespace student {
    export type Table = 'student';
    export interface Selectable {
      /**
      * **student.student_id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('student_student_id_seq'::regclass)`
      */
      student_id: number;
      /**
      * **student.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      first_name: string;
      /**
      * **student.last_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      last_name: string;
    }
    export interface JSONSelectable {
      /**
      * **student.student_id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('student_student_id_seq'::regclass)`
      */
      student_id: number;
      /**
      * **student.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      first_name: string;
      /**
      * **student.last_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      last_name: string;
    }
    export interface Whereable {
      /**
      * **student.student_id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('student_student_id_seq'::regclass)`
      */
      student_id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **student.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      first_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **student.last_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      last_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **student.student_id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('student_student_id_seq'::regclass)`
      */
      student_id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **student.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      first_name: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **student.last_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      last_name: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **student.student_id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('student_student_id_seq'::regclass)`
      */
      student_id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **student.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      first_name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **student.last_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      last_name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export type UniqueIndex = 'student_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* --- aggregate types --- */

  export namespace public {  
    export type Table = migrations.Table | student.Table;
    export type Selectable = migrations.Selectable | student.Selectable;
    export type JSONSelectable = migrations.JSONSelectable | student.JSONSelectable;
    export type Whereable = migrations.Whereable | student.Whereable;
    export type Insertable = migrations.Insertable | student.Insertable;
    export type Updatable = migrations.Updatable | student.Updatable;
    export type UniqueIndex = migrations.UniqueIndex | student.UniqueIndex;
    export type Column = migrations.Column | student.Column;
  
    export type AllBaseTables = [migrations.Table, student.Table];
    export type AllForeignTables = [];
    export type AllViews = [];
    export type AllMaterializedViews = [];
    export type AllTablesAndViews = [migrations.Table, student.Table];
  }



  /* === global aggregate types === */

  export type Schema = 'public';
  export type Table = public.Table;
  export type Selectable = public.Selectable;
  export type JSONSelectable = public.JSONSelectable;
  export type Whereable = public.Whereable;
  export type Insertable = public.Insertable;
  export type Updatable = public.Updatable;
  export type UniqueIndex = public.UniqueIndex;
  export type Column = public.Column;

  export type AllSchemas = ['public'];
  export type AllBaseTables = [...public.AllBaseTables];
  export type AllForeignTables = [...public.AllForeignTables];
  export type AllViews = [...public.AllViews];
  export type AllMaterializedViews = [...public.AllMaterializedViews];
  export type AllTablesAndViews = [...public.AllTablesAndViews];


  /* === lookups === */

  export type SelectableForTable<T extends Table> = {
    "migrations": migrations.Selectable;
    "student": student.Selectable;
  }[T];

  export type JSONSelectableForTable<T extends Table> = {
    "migrations": migrations.JSONSelectable;
    "student": student.JSONSelectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    "migrations": migrations.Whereable;
    "student": student.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    "migrations": migrations.Insertable;
    "student": student.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    "migrations": migrations.Updatable;
    "student": student.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    "migrations": migrations.UniqueIndex;
    "student": student.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    "migrations": migrations.Column;
    "student": student.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    "migrations": migrations.SQL;
    "student": student.SQL;
  }[T];

}
