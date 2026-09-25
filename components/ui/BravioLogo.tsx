// BRAVÍO — Official Logo Components
// Using exact SVG paths from brand files. Do NOT modify geometry, scale or proportions.

import React from "react";

type LogoVariant = "principal" | "negativo" | "monocromo";

interface BravioLogoProps {
  variant?: LogoVariant;
  className?: string;
  width?: number | string;
  height?: number | string;
  "aria-label"?: string;
}

// ── Cruz de Hierro (standalone) ──
export function CruzDeHierro({
  color = "#5E1C23",
  className = "",
  size = 48,
  ...props
}: {
  color?: string;
  className?: string;
  size?: number | string;
  [key: string]: unknown;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-280 -280 560 560"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
      {...props}
    >
      <title>Cruz de Hierro BRAVÍO</title>
      <g fill={color}>
        <path d="M -58.8 -58.8 L 58.8 -58.8 L 109.2 -210 L -109.2 -210 Z M -58.8 58.8 L 58.8 58.8 L 109.2 210 L -109.2 210 Z M -58.8 -58.8 L -58.8 58.8 L -210 109.2 L -210 -109.2 Z M 58.8 -58.8 L 58.8 58.8 L 210 109.2 L 210 -109.2 Z M -58.8 -58.8 L 58.8 -58.8 L 58.8 58.8 L -58.8 58.8 Z" />
      </g>
    </svg>
  );
}

// ── Logotipo BRAVÍO Apilado (stacked: BRAVIO on top, VIO below + Cruz) ──
// Principal = Red Oxide on Cloudy Valley
// Negativo = Cloudy Valley on Volcanic
// Monocromo = black on white
export function BravioLogoApilado({
  variant = "principal",
  className = "",
  width = 280,
  height = 230,
  "aria-label": ariaLabel = "BRAVÍO",
}: BravioLogoProps) {
  const palette = {
    principal: { fill: "#5E1C23", bg: "none" },
    negativo: { fill: "#B1C7D4", bg: "none" },
    monocromo: { fill: "#1A1410", bg: "none" },
  };

  const { fill } = palette[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-110 -1990 2554 2100"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <title>BRAVÍO</title>
      <g fill={fill} transform="scale(1,-1)">
        {/* BRA row */}
        <g transform="translate(0.0,1150)">
          {/* B */}
          <g transform="translate(0,0)">
            <path d="M722 519Q722 392 607 359V355Q738 325 738 183Q738 129 711.5 87.5Q685 46 639.0 23.0Q593 0 538 0H74V688H532Q584 688 627.5 666.5Q671 645 696.5 606.0Q722 567 722 519ZM295 420H447Q469 420 483.5 435.5Q498 451 498 474V484Q498 506 483.0 521.5Q468 537 447 537H295ZM295 160H463Q485 160 499.5 175.5Q514 191 514 214V224Q514 247 499.5 262.5Q485 278 463 278H295Z" />
          </g>
          {/* R */}
          <g transform="translate(778,0)">
            <path d="M594 288 747 0H499L377 251H295V0H74V688H495Q569 688 621.5 659.5Q674 631 700.5 582.5Q727 534 727 477Q727 414 693.0 363.0Q659 312 594 288ZM440 531H295V404H440Q466 404 484.0 422.5Q502 441 502 468Q502 495 484.0 513.0Q466 531 440 531Z" />
          </g>
          {/* A */}
          <g transform="translate(1556,0)">
            <path d="M535 0 506 97H265L236 0H10L261 688H518L769 0ZM311 251H460L388 496H384Z" />
          </g>
        </g>
        {/* VIO row */}
        <g transform="translate(167.0,0)">
          {/* V */}
          <g transform="translate(0,0)">
            <path d="M261 0 17 688H253L391 228H395L534 688H760L517 0Z" />
          </g>
          {/* I */}
          <g transform="translate(778,0)">
            <path d="M84 0V688H305V0Z" />
          </g>
          {/* O */}
          <g transform="translate(1167,0)">
            <path d="M788 344Q788 170 691.0 79.0Q594 -12 416 -12Q238 -12 141.5 78.5Q45 169 45 344Q45 519 141.5 609.5Q238 700 416 700Q594 700 691.0 609.0Q788 518 788 344ZM271 376V312Q271 239 308.0 196.0Q345 153 416 153Q487 153 524.5 196.0Q562 239 562 312V376Q562 449 524.5 492.0Q487 535 416 535Q345 535 308.0 492.0Q271 449 271 376Z" />
          </g>
        </g>
        {/* Cruz de Hierro */}
        <g transform="translate(1139.5,940.0)">
          <path d="M -64.4 -64.4 L 64.4 -64.4 L 119.6 -230 L -119.6 -230 Z M -64.4 64.4 L 64.4 64.4 L 119.6 230 L -119.6 230 Z M -64.4 -64.4 L -64.4 64.4 L -230 119.6 L -230 -119.6 Z M 64.4 -64.4 L 64.4 64.4 L 230 119.6 L 230 -119.6 Z M -64.4 -64.4 L 64.4 -64.4 L 64.4 64.4 L -64.4 64.4 Z" />
        </g>
      </g>
    </svg>
  );
}

// ── Logotipo BRAVÍO Horizontal (with descriptor "WESTERN PARA LA VIDA ACTUAL") ──
export function BravioLogoHorizontal({
  variant = "principal",
  className = "",
  width = 320,
  height = 133,
  "aria-label": ariaLabel = "BRAVÍO — Western para la vida actual",
}: BravioLogoProps) {
  const fill = variant === "negativo" ? "#B1C7D4" : variant === "monocromo" ? "#1A1410" : "#5E1C23";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-110 -1215 4554 1898.7826277572271"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <title>BRAVÍO — Western para la vida actual</title>
      <g fill={fill} transform="scale(1,-1)">
        {/* B */}
        <g transform="translate(0,0)">
          <path d="M722 519Q722 392 607 359V355Q738 325 738 183Q738 129 711.5 87.5Q685 46 639.0 23.0Q593 0 538 0H74V688H532Q584 688 627.5 666.5Q671 645 696.5 606.0Q722 567 722 519ZM295 420H447Q469 420 483.5 435.5Q498 451 498 474V484Q498 506 483.0 521.5Q468 537 447 537H295ZM295 160H463Q485 160 499.5 175.5Q514 191 514 214V224Q514 247 499.5 262.5Q485 278 463 278H295Z" />
        </g>
        {/* R */}
        <g transform="translate(778,0)">
          <path d="M594 288 747 0H499L377 251H295V0H74V688H495Q569 688 621.5 659.5Q674 631 700.5 582.5Q727 534 727 477Q727 414 693.0 363.0Q659 312 594 288ZM440 531H295V404H440Q466 404 484.0 422.5Q502 441 502 468Q502 495 484.0 513.0Q466 531 440 531Z" />
        </g>
        {/* A */}
        <g transform="translate(1556,0)">
          <path d="M535 0 506 97H265L236 0H10L261 688H518L769 0ZM311 251H460L388 496H384Z" />
        </g>
        {/* V */}
        <g transform="translate(2334,0)">
          <path d="M261 0 17 688H253L391 228H395L534 688H760L517 0Z" />
        </g>
        {/* I */}
        <g transform="translate(3112,0)">
          <path d="M84 0V688H305V0Z" />
        </g>
        {/* O */}
        <g transform="translate(3501,0)">
          <path d="M788 344Q788 170 691.0 79.0Q594 -12 416 -12Q238 -12 141.5 78.5Q45 169 45 344Q45 519 141.5 609.5Q238 700 416 700Q594 700 691.0 609.0Q788 518 788 344ZM271 376V312Q271 239 308.0 196.0Q345 153 416 153Q487 153 524.5 196.0Q562 239 562 312V376Q562 449 524.5 492.0Q487 535 416 535Q345 535 308.0 492.0Q271 449 271 376Z" />
        </g>
        {/* Cruz */}
        <g transform="translate(3306.5,940)">
          <path d="M -46.2 -46.2 L 46.2 -46.2 L 85.8 -165 L -85.8 -165 Z M -46.2 46.2 L 46.2 46.2 L 85.8 165 L -85.8 165 Z M -46.2 -46.2 L -46.2 46.2 L -165 85.8 L -165 -85.8 Z M 46.2 -46.2 L 46.2 46.2 L 165 85.8 L 165 -85.8 Z M -46.2 -46.2 L 46.2 -46.2 L 46.2 46.2 L -46.2 46.2 Z" />
        </g>
      </g>
    </svg>
  );
}
