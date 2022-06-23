import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './SearchResults.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { clearSearch, searchGoods } from '../../../store/search';
import SearchItem from '../SearchItem/SearchItem';
import TagBadge from '../TagBadge/TagBadge';
import { CATEGORY_ALL } from '../../../helpers/consts';
import Loader from '../Loader/Loader';
import useDebounce from '../../../hooks/useDebounce';
import Button from '../Button/Button';

type OwnProps = {
  isOpen?: boolean;
  searchFilter: string;
  onClose: VoidFunction;
};

function SearchResults({
  isOpen,
  searchFilter,
  onClose,
}: OwnProps) {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state) => state.search.goods);
  const searchResultsTags = useAppSelector((state) => state.search.tags);
  const isLoading = useAppSelector((state) => state.search.isLoading);

  const navigate = useNavigate();
  const debouncedSearchFilter = useDebounce(searchFilter, 500);

  const [isFocused, setFocused] = useState(false);
  const [tag, setTag] = useState<number>(0);

  useEffect(() => {
    setTag(0);
    dispatch(clearSearch());
  }, [searchFilter]);

  useEffect(() => {
    if (!debouncedSearchFilter) return;

    dispatch(searchGoods({
      category: tag,
      nameFilter: debouncedSearchFilter,
      idOfPreviousGood: 0,
      numOfGoodsToGet: 10
    }));
  }, [debouncedSearchFilter, tag]);

  const hasFoundAnything = searchResults && Object.values(searchResults).length > 0;

  return (
    <div
      className={cn(styles.root, (isOpen || isFocused) && styles.open)}
      onMouseEnter={() => setFocused(true)}
    >
      <div className={styles.title}>
        {searchFilter
          ? (hasFoundAnything || isLoading ? `Search results for ${searchFilter}` : 'No results found')
          : 'Please enter search query'}
        <Button
          variant="icon-translucent"
          className={styles.closeButton}
          onClick={() => {
            onClose();
            setFocused(false);
          }}
          buttonSize="small"
        >
          <i className="icon-close" />
        </Button>
      </div>

      {searchFilter && isLoading && <Loader />}
      {searchFilter && !isLoading && hasFoundAnything && (
        <>
          <div className={styles.tags}>
            <TagBadge tag={CATEGORY_ALL} isSelected={tag === 0} onClick={() => setTag(0)} />

            {searchResultsTags && Object.values(searchResultsTags).map((t) => (
              <TagBadge key={t.id} tag={t} isSelected={tag === t.id} onClick={() => setTag(t.id)} />
            ))}
          </div>

          {searchResults && Object.values(searchResults).map((item) => (
            <SearchItem
              item={item}
              key={item.id}
              onClick={() => {
                navigate(`/goods/${item.id}`);
                onClose();
                setFocused(false);
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default SearchResults;
