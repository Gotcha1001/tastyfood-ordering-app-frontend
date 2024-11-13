import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (R) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="10.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ display: "inline-block" }} // Prevent layout shifts
      >
        <Button
          type="button"
          onClick={removeMenuItem}
          className="bg-red-500 max-h-fit"
        >
          Remove
        </Button>
      </motion.div>
    </div>
  );
};

export default MenuItemInput;
