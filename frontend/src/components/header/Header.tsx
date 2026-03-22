import { useState } from "react";
import { KeyRound, LogOut } from "lucide-react";

import HeaderModal from "../../modal/HeaderModal";
import { useNavigate } from "react-router-dom";
import NavbarMobile from "../navbar/NavbarMobile";
import { ModeToggle } from "./ToogleTheme";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axiosInstance from "@/api/axios";
import { Loader2 } from "lucide-react"
import axios from "axios";

const UpdatePassword = () => {
  const { toast } = useToast();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, {
          message: "Votre mot de passe doit contenir 8 caractères minimum",
        })
        .regex(/[0-9]/, {
          message: "Votre mot de passe doit contenir au moins un chiffre",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message:
            "Votre mot de passe doit contenir au moins un caractère spécial",
        }),
      newPassword: z
        .string()
        .min(8, {
          message: "Votre mot de passe doit contenir 8 caractères minimum",
        })
        .regex(/[0-9]/, {
          message: "Votre mot de passe doit contenir au moins un chiffre",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message:
            "Votre mot de passe doit contenir au moins un caractère spécial",
        }),
      passwordConfirm: z.string(),
    })
    .superRefine(({ newPassword, passwordConfirm, password }, ctx) => {
      if (newPassword !== passwordConfirm) {
        ctx.addIssue({
          code: "custom",
          message: "Les mots de passe ne correspondent pas",
          path: ["passwordConfirm"],
        });
        if (newPassword === password) {
          ctx.addIssue({
            code: "custom",
            message:
              "Le nouveau mot de passe doit être différent du mot de passe actuel",
            path: ["newPassword"],
          });
        }
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const data = {
        current_password: values.password,
        new_password: values.newPassword,
        re_new_passowrd: values.passwordConfirm
      };
      await axiosInstance.post(
        "/auth/users/set_password/",
        data
      );
      form.reset();
      toast({
        title: "Votre mot de passe été changé avec succès 👍",
        description:
          "Vous pouvez vous connecter avec votre nouveau mot de passe",
      });
      setIsWrongPassword(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        form.reset();
        setIsWrongPassword(true);
      } else {
        toast({
          title: "Votre mot de passe n'a pas pu être changé ❌",
          description: "Veuillez réesayer ultérieurement",
        });
        console.error("Login failed", error);
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      {isWrongPassword && (
        <p className="text-red-600">Mot de passe actuel incorrect</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe actuel</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mx-auto"
            type="submit"
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading &&  <Loader2 className="animate-spin mr-3" />}
            Valider
          </Button>
        </form>
      </Form>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalNavBarOpen, setIsModalNavBarOpen] = useState<boolean>(false);

  const closeModalNavBar = () => {
    setIsModalNavBarOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleLogout = () => {
    localStorage.removeItem("JWTGP");
    navigate("/auth/login");
  };
  return (
    <div className="w-full fixed top-0 z-50 border-b">
      <div className=" bg-white dark:bg-slate-800 flex items-center justify-between w-full border-b px-10 py-2">
        <div className="flex flex-col items-center">
          {/* <h1 className="text-xl lg:text-3xl font-thin ">
            Garden Companion <span className="text-sm lg:text-xl ">Beta</span>
          </h1> */}
          <h1 className="text-xl lg:text-3xl font-thin ">
            Garden Companion
          </h1>
          <span className="text-xs font-thin lg:text-lg">
            {today.toLocaleDateString("fr-FR", options)}
          </span>
        </div>
        <div className="flex gap-1 md:gap-5 items-center">
          <ModeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <KeyRound size={"20"} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="
          dark:bg-slate-900 ml-6">
              <UpdatePassword />
            </PopoverContent>
          </Popover>
          {/* <Button variant={"ghost"} size={"icon"}>
            <NotebookPen size={"20"} />
          </Button> */}
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={"20"} />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
      <HeaderModal
        isOpen={isModalOpen}
        content={modalContent}
        onClose={closeModal}
      />

      <NavbarMobile onClose={closeModalNavBar} isOpen={isModalNavBarOpen} />
    </div>
  );
};
export default Header;
