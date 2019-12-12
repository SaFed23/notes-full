const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("todo-list.sqlite");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY, name TEXT, level INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, category_name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, category_id INTEGER, date TEXT, title TEXT, content TEXT)");
})

class TODO {
    static getAll(cb) {
        const sql = "SELECT * FROM todo";
        db.all(sql, cb);
    }

    static createNewTask(data, cb) {
        db.run("INSERT INTO todo (name, level) VALUES (?, ?)", data.name, data.level, cb);
    }

    static deleteById(id, cb) {
        const sql = `DELETE FROM todo WHERE id=${id}`;
        db.run(sql, cb);
    }
}

class Categories {
    static getAll(cb) {
        const sql = "SELECT * FROM categories";
        db.all(sql, cb);
    }

    static createNewCategory(data, cb) {
        db.run("INSERT INTO categories (category_name) VALUES (?)", data, cb);
    }

    static deleteById(id, cb) {
        const sql = `DELETE FROM categories WHERE id=${id}`;
        db.run(sql, cb);
    }
}

class Notes {
    static getAll(cb) {
        const sql = "SELECT * FROM notes";
        db.all(sql, cb);
    }

    static createNewNote(data, cb) {
        db.run("INSERT INTO notes (date, category_id, title, content) VALUES (?, ?, ?, ?)", data.date, data.category, data.title, data.content, cb);
    }

    static update(id, data, cb) {
        db.run("UPDATE notes SET date=?, title=?, content=? WHERE id=?", data.date, data.title, data.content, id, cb);
    }

    static deleteById(id, cb) {
        const sql = `DELETE FROM notes WHERE id=${id}`;
        db.run(sql, cb);
    }

    static deleteByCategory(category, cb) {
        const sql = `DELETE FROM notes WHERE category_id=${category}`;
        db.run(sql, cb);
    }

}

module.exports = { TODO, Categories, Notes };