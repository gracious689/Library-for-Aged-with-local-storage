

export const BookCard = ({book}) => {
  return (
    <div className="border rounded-lg p-4">
    <img className="w-full h-48 object-cover mb-4" src={book.coverImage} alt={book.title} />
    <div className="text-center">
      <h3 className="text-lg font-bold mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">{book.author}</p>
      <p className="text-gray-800">{book.description}</p>
    </div>
    <div className="flex justify-around">
          <a 
            href={book.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Read
          </a>
          <a 
            href={book.pdfUrl} 
            download
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Download
          </a>
        </div>
  </div>
  )
}
