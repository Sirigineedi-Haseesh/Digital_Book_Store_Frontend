import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks, deleteBook } from '../../Services/BookService';
import { getBooks } from '../../Services/UserService';
import SearchBar from '../../Components/SearchBar/SearchBar';
import ReusableTable from '../../Components/ReusableTable/ReusableTable';
import ErrorAlert from '../../Components/ErrorAlert/ErrorAlert';
import PageHeader from '../../Components/PageHeader/PageHeader';
import ActionButton from '../../Components/ActionButton/ActionButton';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Track the book to delete
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await getBooks();
        setBooks(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteBook(selectedBook.title);
      setBooks(books.filter((book) => book.title !== selectedBook.title));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book.');
    }
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleEdit = (title) => {
    navigate('/editbook/' + title);
  };

  const handleCreateBook = () => {
    navigate('/addbooks');
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (!searchQuery) {
        const data = await getBooks();
        setBooks(data);
        setError(null);
      } else {
        const results = await searchBooks(searchQuery);
        setBooks(results);
        setError(null);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setError('Failed to search books.');
    } finally {
      setIsLoading(false);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { header: 'Book Title', key: 'title' },
    { header: 'Category', key: 'category' },
    { header: 'Author', key: 'authorName' },
    { header: 'ISBN', key: 'isbn' },
    { header: 'Price', key: 'price' },
    { header: 'Image', render: (book) => <img src={book.images} alt={book.title} style={{ width: '50px' }} /> },
    { header: 'Stock', render: (book) => book.inventory?.stock || 'N/A' }, // Access nested stock
  ];

  const actions = [
    {
      label: 'Edit',
      variant: 'warning',
      onClick: (book) => handleEdit(book.title),
    },
    {
      label: 'Delete',
      variant: 'danger',
      onClick: (book) => openDeleteModal(book),
    },
  ];

  // Function to dynamically apply a class to rows
  const getRowClassName = (book) => {
    if (book.inventory?.stock < 10) {
      return 'table-danger'; // Bootstrap class for red background
    }
    return ''; // No additional class for other rows
  };

  return (
    <div style={{ backgroundColor: 'rgb(239, 235, 229)' }}>
      <div className="container mt-10" style={{ backgroundColor: 'rgb(239, 235, 229)', padding: '20px', borderRadius: '10px' }}>
        <PageHeader title="Manage Books" />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Books Page</h2>
          <ActionButton label="Add Book" onClick={handleCreateBook} />
        </div>
        <SearchBar
          placeholder="Search Here..."
          searchQuery={searchQuery}
          onInputChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <ErrorAlert message={error} />
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <ReusableTable
          columns={columns}
          data={currentBooks}
          actions={actions}
          rowClassName={getRowClassName} // Pass the rowClassName function
        />
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
                <li key={index} className="page-item">
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the book titled "{selectedBook?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BooksPage;
