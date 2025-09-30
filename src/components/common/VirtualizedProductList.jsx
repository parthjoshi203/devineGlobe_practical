import React, { memo } from "react";
import ProductCard from "./ProductCard";
import VideoCard from "./VideoCard";
import { ITEM_TYPES } from "../../constants";

const VirtualizedProductList = memo(({ items, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) =>
        item.type === ITEM_TYPES.PRODUCT ? (
          <ProductCard
            key={item.id}
            product={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <VideoCard
            key={item.id}
            video={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
});

VirtualizedProductList.displayName = "VirtualizedProductList";

export default VirtualizedProductList;
