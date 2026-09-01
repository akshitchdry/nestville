"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Property {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: string | null;
  image: string | null;
  category: string | null;
  featured: boolean | null;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadFavourite() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted || !user) {
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("favourites")
        .select("id")
        .eq("user_id", user.id)
        .eq("property_id", property.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Error loading favourite:",
          error.message
        );
        return;
      }

      if (mounted) {
        setIsFavourite(!!data);
      }
    }

    loadFavourite();

    return () => {
      mounted = false;
    };
  }, [property.id]);

  async function toggleFavourite(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    if (loading) {
      return;
    }

    const supabase = createClient();

    let currentUserId = userId;

    // Agar userId abhi state me nahi aayi hai,
    // directly Supabase se user check karo.
    if (!currentUserId) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login to save favourites.");
        return;
      }

      currentUserId = user.id;
      setUserId(user.id);
    }

    setLoading(true);

    try {
      if (isFavourite) {
        const { error } = await supabase
          .from("favourites")
          .delete()
          .eq("user_id", currentUserId)
          .eq("property_id", property.id);

        if (error) {
          throw error;
        }

        setIsFavourite(false);
      } else {
        const { error } = await supabase
          .from("favourites")
          .insert({
            user_id: currentUserId,
            property_id: property.id,
          });

        if (error) {
          throw error;
        }

        setIsFavourite(true);
      }

      // Favourites page / other components ko update signal
      window.dispatchEvent(
        new Event("favourites-changed")
      );
    } catch (error) {
      console.error("Favourite error:", error);

      alert(
        "Unable to update favourite. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const image =
    property.image &&
    property.image.startsWith("/")
      ? property.image
      : "/images/properties/residence-1.webp";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.025]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#d6b56a]/30
      "
    >
      {/* IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0c0b]">
        <img
          src={image}
          alt={property.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* IMAGE GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-transparent
            to-transparent
          "
        />

        {/* FAVOURITE BUTTON */}

        <button
          type="button"
          onClick={toggleFavourite}
          disabled={loading}
          aria-label={
            isFavourite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          className={`
            absolute
            right-5
            top-5
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            backdrop-blur-md
            transition-all
            duration-300
            ${
              isFavourite
                ? "border-[#d6b56a] bg-[#d6b56a] text-black"
                : "border-white/15 bg-black/50 text-white/70 hover:border-[#d6b56a] hover:bg-[#d6b56a] hover:text-black"
            }
          `}
        >
          <Heart
            size={17}
            strokeWidth={1.7}
            fill={
              isFavourite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {/* FEATURED */}

        {property.featured && (
          <span
            className="
              absolute
              left-5
              top-5
              rounded-full
              border
              border-[#d6b56a]/30
              bg-black/50
              px-3
              py-2
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#e6ca86]
              backdrop-blur-md
            "
          >
            Featured
          </span>
        )}

        {/* CATEGORY */}

        <span
          className="
            absolute
            bottom-5
            left-5
            rounded-full
            border
            border-white/10
            bg-black/50
            px-3
            py-2
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/70
            backdrop-blur-md
          "
        >
          {property.category ||
            "Luxury Property"}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <h2 className="truncate text-xl font-light text-white">
              {property.title}
            </h2>

            <p className="mt-2 text-xs text-white/35">
              {property.location}
            </p>
          </div>

          <p
            className="
              shrink-0
              text-sm
              text-[#d6b56a]
            "
          >
            {property.price}
          </p>
        </div>

        {/* DETAILS */}

        <div className="mt-6 flex flex-wrap gap-2">
          <InfoBadge>
            {property.bedrooms ?? 0} Beds
          </InfoBadge>

          <InfoBadge>
            {property.bathrooms ?? 0} Baths
          </InfoBadge>

          <InfoBadge>
            {property.area ||
              "Area on Request"}
          </InfoBadge>
        </div>

        {/* VIEW */}

        <div
          className="
            mt-6
            border-t
            border-white/10
            pt-5
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/40
              transition-colors
              group-hover:text-[#d6b56a]
            "
          >
            Explore Residence →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================
   INFO BADGE
========================================= */

function InfoBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        border
        border-white/10
        px-3
        py-2
        text-[9px]
        text-white/40
      "
    >
      {children}
    </span>
  );
}