import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          const searchRow = row[key].toLowerCase()

          return searchRow
                  .includes(
                    value.toLowerCase()
                  )
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      for (const item of data) {
        this.#database[table].push(item);
      }
    } else {
      this.#database[table] = data;
    }

    this.#persist()

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    const indexFound = rowIndex > -1

    if (indexFound) {
      const { created_at, completed_at } = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = { id, ...data, created_at, completed_at }
      this.#persist()
    }
  }

  updateTaskState(table, id, completedDate) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    const indexFound = rowIndex > -1

    if (indexFound) {
      const { ...data } = this.#database[table][rowIndex]

      this.#database[table][rowIndex] = { id, ...data, completed_at: completedDate }
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    const indexFound = rowIndex > -1

    if (indexFound) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}