import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { Container } from "./styles";

interface IPaginationProps {
  pages: number;
  pageSelected: number;
  handlePageSelected: (page: number) => void;
}

const Pagination = ({
  pages,
  pageSelected,
  handlePageSelected,
}: IPaginationProps) => {
  return (
    <Container>
      <button
        title="primeira página"
        disabled={pageSelected <= 1 || pages === 0}
        onClick={() => handlePageSelected(1)}
      >
        <FiChevronsLeft />
      </button>
      <button
        title="página anterior"
        disabled={pageSelected <= 1 || pages === 0}
        onClick={() => handlePageSelected(pageSelected - 1)}
      >
        <FiChevronLeft />
      </button>

      <span title="página atual">{pageSelected}</span>

      <button
        title="próxima página"
        disabled={pageSelected >= pages || pages === 0}
        onClick={() => handlePageSelected(pageSelected + 1)}
      >
        <FiChevronRight />
      </button>
      <button
        title="última página"
        disabled={pageSelected >= pages || pages === 0}
        onClick={() => handlePageSelected(pages)}
      >
        <FiChevronsRight />
      </button>
    </Container>
  );
};

export default Pagination;
