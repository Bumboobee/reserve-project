import "./App.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./service/queryClient";
import Table from "./components/table";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  );
}

export default App;
