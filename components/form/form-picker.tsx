"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Check, Loader, RefreshCcwIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { basicImages } from "@/constants/images";
import { FormError } from "./form-error";
import { Button } from "../ui/button";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

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

  return (
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
              id={id}
              name={id}
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
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[9px] text-white p-1 bg-black/50"
            >
              <span className="hover:underline">{image.user.name}</span> on{" "}
              <Link
                href="https://unsplash.com/"
                target="_blank"
                className="hover:underline"
              >
                Unsplash
              </Link>
            </Link>
          </div>
        ))}
      </div>
      <FormError id="image" errors={errors} />
    </div>
  );
};
