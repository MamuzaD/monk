"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { basicImages } from "@/constants/images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormError } from "./form-error";

interface FormPickerProps {
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const refresh = useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 4,
        });

        if (result && result.response) {
          const results = result.response as Array<Record<string, any>>;
          setImages(results);
        } else {
          console.error("error to get unsplash images");
        }
      } catch (error) {
        setImages(basicImages); //basic images for when api requests run out
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const colors: Record<string, any>[] = [
    { name: "black", hex: "#0A0A0A" },
    { name: "white", hex: "#FAFAFA" },
    { name: "blue", hex: "#0000FF" },
    { name: "red", hex: "#FF0000" },
    { name: "green", hex: "#008000" },
    { name: "yellow", hex: "#FFFF00" },
    { name: "orange", hex: "#FFA500" },
    { name: "purple", hex: "#800080" },
    { name: "pink", hex: "#FFC0CB" },
  ];

  return (
    <Tabs defaultValue="images" className="mt-1">
      <TabsList className="grid w-full grid-cols-2 text-sm">
        <TabsTrigger
          value="images"
          onClick={() => setSelectedColor(null)}
          disabled={pending}
        >
          Images
        </TabsTrigger>
        <TabsTrigger
          value="colors"
          onClick={() => setSelectedImageId(null)}
          disabled={pending}
        >
          Colors
        </TabsTrigger>
      </TabsList>
      <TabsContent value="images">
        <div className="relative">
          <div className="grid grid-cols-2 gap-2 my-2">
            {images.map((image) => (
              <div
                key={image.id}
                className={cn(
                  "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                  pending && "opacity-50 hover:opacity-50 cursor-auto"
                )}
                onClick={() => {
                  if (pending) return;
                  setSelectedImageId(image.id);
                }}
              >
                <input
                  type="radio"
                  id="image"
                  name="image"
                  readOnly
                  checked={selectedImageId === image.id}
                  disabled={pending}
                  defaultValue={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                  hidden
                />
                <Image
                  fill
                  src={image.urls.thumb}
                  alt="Unsplash Wallpaper"
                  className="object-cover rounded-sm"
                  sizes="33vw"
                />
                {selectedImageId === image.id && (
                  <div className="absolute inset-y-0 h-full w-full bg-black/40 flex items-center justify-center text-white">
                    <Check />
                  </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[9px] text-white p-1 bg-black/50">
                  <Link
                    href={image.links.html}
                    target="_blank"
                    className="hover:underline"
                  >
                    {image.user.name}
                  </Link>{" "}
                  on{" "}
                  <Link
                    href="https://unsplash.com/"
                    target="_blank"
                    className="hover:underline"
                  >
                    Unsplash
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <FormError id="image" errors={errors} />
        </div>
      </TabsContent>
      <TabsContent value="colors">
        <div className="relative">
          <div className="grid grid-cols-3 gap-2 my-2">
            {colors.map((color) => (
              <div
                key={color.name}
                className={cn(
                  "cursor-pointer relative aspect-video group hover:opacity-75 transition rounded-lg",
                  pending && "opacity-50 hover:opacity-50 cursor-auto"
                )}
                onClick={() => {
                  if (pending) return;
                  setSelectedColor(color.name);
                }}
                style={{ backgroundColor: color.hex }}
              >
                <input
                  type="radio"
                  id="color"
                  name="color"
                  readOnly
                  checked={selectedColor === color.name}
                  disabled={pending}
                  defaultValue={`${color.hex}`}
                  hidden
                />
                {selectedColor === color.name && (
                  <div className="absolute inset-y-0 h-full w-full bg-black/40 flex items-center justify-center text-white">
                    <Check />
                  </div>
                )}
              </div>
            ))}
          </div>
          <FormError id="image" errors={errors} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
