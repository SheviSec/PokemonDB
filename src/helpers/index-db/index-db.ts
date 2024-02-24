import { PaginationModel } from "@/hooks/use-pokemon.hook";
import { openDB, IDBPDatabase } from "idb";

export class IndexedDb {
  private database: string;
  private db: IDBPDatabase<unknown> | null = null; // Initialize with null
  private isInitialized: boolean = false;
  private initializationPromise: Promise<void> | null = null;
  private pageLimit = 20;
  private tableName: string;

  constructor(database: string, tableName: string) {
    this.database = database;
    this.tableName = tableName;
    this.initialize();
  }

  private async initialize() {
    if (!this.initializationPromise) {
      this.initializationPromise = this.initDatabase();
    }
    await this.initializationPromise;
  }

  private async initDatabase() {
    const tableName = this.tableName;
    try {
      this.db = (await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase<unknown>) {
          // Create object stores if they don't exist
          if (!db.objectStoreNames.contains(tableName)) {
            db.createObjectStore(tableName, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      })) as IDBPDatabase<unknown>; // Explicit cast here

      this.isInitialized = true; // Set initialization flag
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error; // Throw the error to handle it appropriately
    }
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        },
      });
    } catch (error) {
      return false;
    }
  }

  public async getValue(tableName: string, id: number) {
    await this.initDatabase();
    if (!this.db) {
      throw new Error("No DB OBJECT!");
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log("Get Data ", JSON.stringify(result));
    return result;
  }

  public async getAllValue(
    tableName: string,
    paginationModel?: PaginationModel
  ) {
    await this.initDatabase();
    if (!this.db) {
      throw new Error("No DB OBJECT!");
    }
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const count = await store.count();
    const query: IDBKeyRange = paginationModel
      ? IDBKeyRange.bound(
          paginationModel.page * paginationModel.pageSize,
          paginationModel.page * paginationModel.pageSize +
            paginationModel.pageSize,
          true
        )
      : IDBKeyRange.bound(1, this.pageLimit);
    const data = await store.getAll(query, this.pageLimit);
    return { data, count };
  }

  public async putValue(tableName: string, value: object) {
    await this.initDatabase();
    if (!this.db) {
      throw new Error("No DB OBJECT!");
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    // console.log("Put Data ", JSON.stringify(result));
    return result;
  }

  public async putBulkValue(tableName: string, values: object[]) {
    await this.initDatabase();
    if (!this.db) {
      throw new Error("No DB OBJECT!");
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
      console.log("Put Bulk Data ", JSON.stringify(result));
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: number) {
    await this.initDatabase();
    if (!this.db) {
      throw new Error("No DB OBJECT!");
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log("Id not found", id);
      return result;
    }
    await store.delete(id);
    console.log("Deleted Data", id);
    return id;
  }
}

export default IndexedDb;
