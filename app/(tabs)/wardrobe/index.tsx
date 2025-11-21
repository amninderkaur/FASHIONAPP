import React, { useEffect, useState } from "react";

type WardrobeItem = {
  id: string;
  name: string;
  imageUrl: string;
  tags: string[];
};

export default function WardrobeIndex() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // TODO: When backend is ready:
      //
      // const res = await fetch("http://your-api/wardrobe");
      // const data: WardrobeItem[] = await res.json();
      // setItems(data);
      //
      setLoading(false); // temporary
    };

    load();
  }, []);

}