import { novelty2026,animeBooks,studyBooks, poetryBooks,detectiveBooks,sciFiBooks,bestsellerBooks} from "./data";
const allBooks = [
    ...novelty2026.map(book=> ({...book,category:'novelty'})),
    ...animeBooks.map(book=> ({...book,category:'manga'})),
    ...studyBooks.map(book=> ({...book, category:'educational'})),
    ...poetryBooks.map(book=> ({...book, category:'poetry'})),
    ...detectiveBooks.map(book=> ({...book, category:'detective'})),
    ...sciFiBooks.map(book=> ({...book, category:'sci-fi'})),
    ...bestsellerBooks.map(book => ({ ...book, category: 'bestseller' }))

];

export default allBooks