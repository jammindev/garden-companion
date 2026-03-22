import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import backendRoutes from "@/api/apiRoutes"

// shadcn ui
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface RegisterProps {
  toggleAuth?: () => void;
}

const Register: React.FC<RegisterProps> = ({ toggleAuth }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const formSchema = z
    .object({
      nickname: z.string().min(4, {
        message:
          "Votre nom d'utilisateur doit comporter au minimum 4 caractères",
      }),
      username: z.string().email({
        message: "Veuillez entrer un adresse email valide",
      }),
      password: z
        .string()
        .min(8, {
          message: "Votre mot de passe doit contenir 8 caractères minimum",
        })
        .regex(/[0-9]/, {
          message: "Votre mot de passe doit contenir au moins un chiffre",
        }),
      passwordConfirm: z.string(),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (password !== passwordConfirm) {
        ctx.addIssue({
          code: "custom",
          message: "Les mots de passe ne correspondent pas",
          path: ["passwordConfirm"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const submitRegisterForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        username: values.nickname,
        email: values.username.toLowerCase(),
        password: values.password,
      };
      const response = await axios.post(
        backendRoutes.register,
        userData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        form.reset();
        toast({
          title: "Votre compte a été créé 👍",
          description:
            "Rendez-vous dans votre boite mail pour valider l'inscription",
        });
        navigate("/auth/login");
      }
    } catch (err) {
      console.error("Login failed", err);
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const errorData = err.response.data;
        if (errorData.username && errorData.username[0] === "A user with that username already exists.") {
          toast({
            title: "Erreur",
            description: "Un utilisateur avec ce nom d'utilisateur existe déjà.",
          });
        } else if (errorData.email && errorData.email[0] === "user with this email already exists.") {
          toast({
            title: "Erreur",
            description: "Un utilisateur avec cet email existe déjà.",
          });
        } else {
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de l'inscription.",
          });
        }
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'inscription.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="px-10 mt-20">
      <CardHeader className="flex flex-row items-center gap-4">
        <CardTitle>Inscription</CardTitle>
      </CardHeader>
      <CardContent className="w-80">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitRegisterForm)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utiliisateur</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
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
                  <FormLabel>Confirmer mot de passe</FormLabel>
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
            disabled={isLoading}
          >
            {isLoading &&  <Loader2 className="animate-spin mr-3" />}
            S'inscrire
        </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <a className="cursor-pointer" onClick={toggleAuth}>
          Déjà inscrit ?
        </a>
      </CardFooter>
    </Card>
  );
};

export default Register;
