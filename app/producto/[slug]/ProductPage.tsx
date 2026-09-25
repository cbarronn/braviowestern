"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { CruzDeHierro } from "@/components/ui/BravioLogo";
import { useCart } from "@/lib/commerce/cart";

export default function ProductPage({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasImages = product.images.length > 0;

  return (
    <div style={{ background: "#0F0C09", minHeight: "100vh", paddingTop: "72px" }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "1.5rem clamp(1.5rem, 6vw, 5rem)" }}>
        <nav aria-label="Ruta de navegación">
          <ol style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
            <li><Link href="/" style={{ color: "#849AAD", textDecoration: "none" }} className="hover:text-white transition-colors">Inicio</Link></li>
            <li>·</li>
            <li><Link href="/coleccion" style={{ color: "#849AAD", textDecoration: "none" }} className="hover:text-white transition-colors">Colección</Link></li>
            <li>·</li>
            <li><Link href={`/${product.category}`} style={{ color: "#849AAD", textDecoration: "none", textTransform: "capitalize" }} className="hover:text-white transition-colors">{product.category}</Link></li>
            <li>·</li>
            <li style={{ color: "#B1C7D4" }}>{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 8rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "clamp(3rem, 6vw, 7rem)" }}>

          {/* LEFT — Image gallery */}
          <div>
            {/* Main image */}
            <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden", background: "#1A1410", marginBottom: "1rem" }}>
              {hasImages ? (
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
                  <CruzDeHierro size={80} color="#3E342D" />
                  <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3E342D", textAlign: "center" }}>
                    Fotografía<br />próximamente
                  </p>
                </div>
              )}
              {/* Subtle gradient on bottom */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,12,9,0.4) 0%, transparent 40%)", pointerEvents: "none" }} />
            </div>

            {/* Thumbnail strip */}
            {hasImages && product.images.length > 1 && (
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(product.images.length, 4)}, 1fr)`, gap: "0.75rem" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      aspectRatio: "1",
                      position: "relative",
                      overflow: "hidden",
                      background: "#1A1410",
                      border: activeImage === i ? "1px solid #B1C7D4" : "1px solid transparent",
                      cursor: "pointer",
                      padding: 0,
                      opacity: activeImage === i ? 1 : 0.5,
                      transition: "opacity 0.3s, border-color 0.3s",
                    }}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover object-bottom" sizes="15vw" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product info */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Header */}
            <div style={{ marginBottom: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid #3E342D" }}>
              <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#849AAD", marginBottom: "0.75rem" }}>
                {product.subtitle}
              </p>
              <h1 style={{
                fontFamily: "ArchivoBlack, sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#B1C7D4",
                marginBottom: "1.25rem",
              }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: "ArchivoBlack, sans-serif", fontSize: "1.5rem", color: "#5E1C23", letterSpacing: "-0.01em" }}>
                ${product.price.toLocaleString("es-MX")} <span style={{ fontSize: "0.9rem", fontFamily: "SpaceGrotesk, sans-serif", fontWeight: 400, color: "#849AAD" }}>MXN</span>
              </p>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "1rem", lineHeight: 1.8, color: "#849AAD", marginBottom: "2.5rem" }}>
              {product.description}
            </p>

            {/* Color selector */}
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD", marginBottom: "1rem" }}>
                Color: <span style={{ color: "#B1C7D4" }}>{selectedColor.name}</span>
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }} role="radiogroup" aria-label="Selecciona el color">
                {product.colors.map((color) => (
                  <button
                    key={color.slug}
                    id={`color-${color.slug}`}
                    aria-label={color.name}
                    aria-pressed={selectedColor.slug === color.slug}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      backgroundColor: color.hex,
                      border: selectedColor.slug === color.slug ? "2px solid #B1C7D4" : "2px solid transparent",
                      outline: selectedColor.slug === color.slug ? "1px solid #B1C7D4" : "none",
                      outlineOffset: "2px",
                      cursor: "pointer",
                      transform: selectedColor.slug === color.slug ? "scale(1.15)" : "scale(1)",
                      transition: "transform 0.2s, border-color 0.2s",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#849AAD" }}>
                  Talla:{" "}
                  {selectedSize
                    ? <span style={{ color: "#B1C7D4" }}>{selectedSize}</span>
                    : <span style={{ color: "#5E1C23" }}>Selecciona tu talla</span>}
                </p>
                <Link href="/guia-de-tallas" style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#849AAD", textDecoration: "none" }} className="hover:text-white transition-colors">
                  Guía de tallas →
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: "0.5rem" }} role="radiogroup" aria-label="Selecciona la talla">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    id={`size-${size.label}`}
                    aria-label={`Talla ${size.label}${!size.available ? " — agotada" : ""}`}
                    aria-pressed={selectedSize === size.label}
                    disabled={!size.available}
                    onClick={() => setSelectedSize(size.label)}
                    style={{
                      padding: "0.875rem 0",
                      fontFamily: "SpaceGrotesk, sans-serif",
                      fontSize: "0.85rem",
                      border: selectedSize === size.label
                        ? "1px solid #B1C7D4"
                        : "1px solid #3E342D",
                      background: selectedSize === size.label ? "#5E1C23" : "transparent",
                      color: !size.available ? "#3E342D" : selectedSize === size.label ? "#B1C7D4" : "#849AAD",
                      cursor: !size.available ? "not-allowed" : "pointer",
                      textDecoration: !size.available ? "line-through" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              id="add-to-cart-button"
              disabled={!selectedSize}
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "1.25rem",
                fontFamily: "SpaceGrotesk, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                border: "none",
                cursor: !selectedSize ? "not-allowed" : "pointer",
                background: added ? "#605246" : !selectedSize ? "#1A1410" : "#5E1C23",
                color: !selectedSize ? "#3E342D" : "#B1C7D4",
                transition: "background 0.3s",
                marginBottom: "2.5rem",
              }}
            >
              {!selectedSize ? "Selecciona tu talla" : added ? "✓ Agregado al carrito" : "Agregar al carrito"}
            </button>

            {/* Accordion details */}
            <div style={{ borderTop: "1px solid #3E342D" }}>
              {[
                { label: "Detalles", items: product.details },
                { label: "Materiales", items: product.materials },
                { label: "Construcción", items: product.construction },
              ].map((section) => (
                <details key={section.label} style={{ borderBottom: "1px solid #3E342D" }}>
                  <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#849AAD", cursor: "pointer", listStyle: "none" }}>
                    {section.label}
                    <span style={{ fontSize: "1rem", color: "#3E342D" }}>+</span>
                  </summary>
                  <ul style={{ paddingBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "0", listStyle: "none", margin: 0 }}>
                    {section.items.map((item, i) => (
                      <li key={i} style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "0.9rem", color: "#605246", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ color: "#5E1C23", marginTop: "0.35rem", flexShrink: 0 }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
              <details style={{ borderBottom: "1px solid #3E342D" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#849AAD", cursor: "pointer", listStyle: "none" }}>
                  Envíos y Devoluciones
                  <span style={{ fontSize: "1rem", color: "#3E342D" }}>+</span>
                </summary>
                <p style={{ paddingBottom: "1.25rem", fontFamily: "SpaceGrotesk, sans-serif", fontSize: "0.9rem", color: "#605246", lineHeight: 1.7 }}>
                  Consulta nuestra{" "}
                  <Link href="/envios-y-devoluciones" style={{ color: "#849AAD", textDecoration: "underline" }}>página de envíos y devoluciones</Link>.
                </p>
              </details>
            </div>

            {/* Origin stamp */}
            <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <CruzDeHierro size={16} color="#5E1C23" />
              <p style={{ fontFamily: "SpaceGrotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3E342D" }}>
                Hecho en León, Guanajuato · México
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
