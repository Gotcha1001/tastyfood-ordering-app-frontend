import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { motion } from "framer-motion";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (FormData: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  // 1 initialize the FORM
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  //2. define the markup for our form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center  gap-3 justify-between flex-row border-2 rounded-full p-3  ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-full"
        >
          <Button
            onClick={handleReset}
            type="button"
            variant="outline"
            className="rounded-full hover:bg-black hover:text-white"
          >
            Reset
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2 }} // Slight scale-up on hover
          whileTap={{ scale: 0.95 }} // Scale-down for a subtle bounce on click
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-full"
        >
          <Button type="submit" className="rounded-full bg-orange-500">
            Search
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default SearchBar;
