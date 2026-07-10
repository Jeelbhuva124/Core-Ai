import { motion } from 'framer-motion';

export const Shop = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <p className="text-muted-foreground mb-8">Browse our products</p>

        {/* Product grid placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-muted animate-pulse" />
              <div className="p-4">
                <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
