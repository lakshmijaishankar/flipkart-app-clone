import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { ProductObjectKey } from "../../redux/silce/productSlice";
import "./SearchSuggestion.css";
import { Link } from "react-router-dom";

type SearchSuggestionProps = {
  searchResult: ProductObjectKey[];
  focusedIndex: number;
  resultContainer: React.Ref<HTMLLIElement>;
};
const SearchSuggestion = ({
  searchResult,
  focusedIndex,
  resultContainer,
}: SearchSuggestionProps) => {
  // console.log(focusedIndex);

  return (
    <section className="searchsuggestion_container">
      <ul>
        {searchResult.map((item, index) => {
          return (
            <Link to={`/productdetails/${item.id}`} key={item.id}>
              <li
                data-id={item.id}
                ref={focusedIndex == index ? resultContainer : undefined}
                className={`flex p-1 mt-2 hover:bg-[#f0f5ff] items-center justify-between ${
                  focusedIndex == index ? "bg-[#f0f5ff]" : ""
                }`}
                /* style={{
                backgroundColor: `${focusedIndex == index ? "#f0f5ff" : ""}`,
              }} */
              >
                <figure className="max-w-[40px]">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="aspect-square"
                  />
                </figure>
                <p className="text-[0.9rem]">{item.title}</p>
                <div className="flex items-center">
                  <BsCurrencyRupee />
                  {item.price}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default SearchSuggestion;
