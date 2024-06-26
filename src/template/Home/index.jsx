import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPost] = useState([]);
  const [allPosts, setAllPost] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');


  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
  ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
  : posts;

  
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const photosAndPosts = await loadPosts();
    setPost(photosAndPosts.slice(page, postsPerPage));
    setAllPost(photosAndPosts);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);
    setPost(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }
  
  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Sem posts</p>
      )}
      
      <div className='button-container'>
        {!searchValue && (
          <Button
            text="Carregar mais posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
