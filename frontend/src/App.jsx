import { useState, useEffect } from "react";
import './App.css';

const quoteColors = [
  '#F7CAC9', '#FFB6C1', '#FF7F50', '#DC143C', '#800000', '#800020', '#E2725B', '#FA8072',
  '#F28500', '#FBCEB1', '#FFDB58', '#F4C430', '#FFBF00', '#FFF700', '#99EDC3', '#50C878',
  '#B2AC88', '#228B22', '#808000', '#008080', '#9FE2BF', '#32CD32', '#89CFF0', '#87CEEB',
  '#007FFF', '#007BA7', '#4169E1', '#000080', '#40E0D0', '#0F52BA', '#C8A2C8',
  '#9966CC', '#DA70D6', '#E0B0FF', '#FF00FF', '#601A35', '#4B0082',
  '#C3B091', '#483C32', '#36454F', '#708090', '#D2691E', '#6F4E37', '#635147', '#D2B48C'
];

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#000');

  const getNewQuote = async () => {
    try {
      
      const response = await fetch('/api/quote', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setQuote(data[0].quote);
      setAuthor(data[0].author);
      setCategory(data[0].category);

      const randomColor = quoteColors[Math.floor(Math.random() * quoteColors.length)];
      setColor(randomColor);
    } catch (error) {
      console.error("Error fetching new quote:", error);
      setQuote("Failed to fetch quote");
      setAuthor("N/A");
      setCategory("N/A");
    }
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div id="container" style={{ backgroundColor: color }}>
      <div id="quote-box" style={{ color: color }}>
        <div id="text"><i className="fa-solid fa-quote-left"></i> {quote}</div>
        <div id="author">- {author}</div>
        <div id="category">Category: {category}</div>
        <div className="buttons">
          <button id="new-quote" onClick={getNewQuote} style={{ backgroundColor: color }}>
            New quote
          </button>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote + '" ' + author)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div id="quote-buttons">
              <i style={{ color: color }} className="fa-brands fa-square-twitter"></i>
            </div>
          </a>
        </div>
      </div>
      <footer className="text">by eezhi</footer>
    </div>
  );
};

export default App;