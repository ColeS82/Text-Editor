import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Put logic that accepts some content and adds it to the database
export const putDb = async (content) => {
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
const request = store.put({ id: 1, value: content });
const result = await request;
console.log('data saved', result);
return result;
}
// getDb implemented to add logic for that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  console.log(jateDb);
  const jx = jateDb.transaction('jate', 'readonly');
  const store = jx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
