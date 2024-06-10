import SearchInput from "./SearchInput";
import EmailInput from "./EmailInput";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import TagInput from "./TagInput";
import FileInput from "./FileInput";
import Select from "./Select";
import Textarea from "./Textarea";

const Input = Object.assign({
  Email: EmailInput,
  Search: SearchInput,
  Text: TextInput,
  Password: PasswordInput,
  Tag: TagInput,
  File: FileInput,
  Select: Select,
  Textarea: Textarea,
});

export default Input;
