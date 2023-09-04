import { useAuthorsQuery } from "@/hooks/useAuthorsQuery";
import './AuthorsList.css';
import { ListLoader } from "../ListLoader/ListLoader";

interface Props {
  onSetAuthor: (v: string) => void;
}

export const AuthorsList: React.FC<Props> = ({ onSetAuthor }) => {
  const { data: authors, isLoading } = useAuthorsQuery();

  return (
    <section className="authors">
      <div className="authors__item">
        <p className="authors__id">ID</p>
        <div className="authors__email-column">Email</div>
      </div>

      {(authors && authors.length > 0)
        ? (
          <ul className="authors__list">
            {authors?.map(({ id, user_email }) => (
              <li
                className="authors__item"
                key={id}
              >
                <p className="authors__id">{id}</p>
                <button
                  className="authors__email"
                  onClick={() => onSetAuthor(user_email)}
                >
                  {user_email}
                </button>
              </li>
            ))}
          </ul>
        )
        : (isLoading)
            ? <ListLoader />
            : <p className="not-find-authors">Don't find authors</p>
      }
    </section>
  );
}