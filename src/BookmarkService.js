const BookmarkService = {
  getAllBookmarks(db) {
    return db.select('*').from('bookmarks');
  },
  getById(db, id) {
    return db
      .from('bookmarks')
      .select('*')
      .where('id', id)
      .first();
  },
  postBookmark(db, stuff) {
    return db
      .insert(stuff)
      .into('bookmarks')
      .returning('*')
      .then(item => item[0]);
  },
  updateById(db, id, stuff) {},
  deleteById(db, id) {
    return db
      .from('bookmarks')
      .where('id', id)
      .delete();
  },
};

module.exports = BookmarkService;
