import { Prisma } from "@prisma/client";

export type Image = {
  id: string;
  path: string;
  filename: string | null;
  title: string | null;
  projectImageId: string | null;
  projectId: number | null;
  componentId: string | null;
  formId: string | null;
  navigationId: string | null;
  pageId: string | null;
};

export type Component = {
  id: string;
  name: string;
  props: Prisma.JsonValue;
  type: string;
  pageId: string | null;
  typeId: string | null;
};

export type Page = {
  id: string;
  name: string;
  content: string;
  props: Prisma.JsonValue;
  typeId: string | null;
};

export type Navigation = {
  id: string;
  name: string;
  props: Prisma.JsonValue;
  path: string;
  typeId: string | null;
};

export type Section = {
  id: string;
  name: string;
  props: Prisma.JsonValue;
};

export type Form = {
  id: string;
  name: string;
  typeId: string | null;
};

export type Field = {
  id: string;
  name: string;
  field: Prisma.JsonValue;
  formId: string | null;
  typeId: string | null;
};

export type Input = {
  id: string;
  name: string;
  attributes: Prisma.JsonValue;
  typeId: string | null;
};

export type Layout = {
  id: string;
  name: string;
  layout: Prisma.JsonValue;
  pageId: string | null;
  typeId: string | null;
};
export type gridLayoutType = {
  type: string;
  columns: {
    column: number;
    rows: {
      row: number;
      content?: string;
      type: string;
      sw?: {};
    }[];
  }[];
};
export type Type = {
  id: string;
  name: string;
  category: string;
  categoryId: string | null;
};

export type Category = {
  id: string;
  name: string;
};
