// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Loads an ES module from this CommonJS build.
 *
 * Some dependencies (`conventional-changelog-writer`,
 * `conventional-changelog-conventionalcommits`) are ESM-only and publish an
 * `import`-only `exports` map, so `require()` cannot resolve them. A literal
 * `await import()` is not usable either: TypeScript downlevels it back to
 * `require()` when emitting CommonJS. Building the dynamic import with
 * `new Function` keeps it out of the compiler's reach so the real,
 * spec-compliant `import()` survives into `build/`.
 */
const dynamicImport = new Function(
  'specifier',
  'return import(specifier);'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as (specifier: string) => Promise<any>;

/**
 * Dynamically imports an ES module by specifier.
 *
 * @param specifier module specifier to import
 * @returns the module namespace object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function importEsm<T = any>(specifier: string): Promise<T> {
  return dynamicImport(specifier) as Promise<T>;
}
