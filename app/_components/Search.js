import { Input } from "../../components/ui/input";
import { SearchIcon } from "lucide-react";

function Search() {
  return (
    <div className="relative">
      <SearchIcon className=" absolute top-2 left-2 text-muted-foreground text-sm h-5 w-5" />
      <Input className="bg-muted" type="search" placeholder="Search" />
    </div>
  );
}

export default Search;
