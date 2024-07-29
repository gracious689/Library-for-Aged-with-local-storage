import  { useState } from 'react';
import { BookCard } from '../conponents/BookCard';
import power from '../assets/power.png';
import Journey from '../assets/JourneyOfSouls.jpg';
import powerPdf from '../assets/power.pdf';
import journeyOfSoulsPdf from '../assets/JourneyOfSouls.pdf';
import { SearchBar } from "../conponents/SearchBar";

export const Library = () => {
  const dummyBooks = [
    {
      _id: '1',
      title: 'Power',
      author: 'Robert Greene',
      description: 'Description 1',
      coverImage: power,
      pdfUrl: powerPdf,
    },
    {
      _id: '2',
      title: 'Journey of Souls',
      author: 'Micheal Newton',
      description: 'Description 2',
      coverImage: Journey,
      pdfUrl: journeyOfSoulsPdf,
    }
    // Add more dummy books as needed
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = dummyBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};
