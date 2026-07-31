# NestVille Next.js App Router structure generator
# Run this file from your project root (where package.json exists).

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "NestVille project structure generator" -ForegroundColor Cyan
Write-Host "-------------------------------------" -ForegroundColor DarkGray

if (-not (Test-Path ".\package.json")) {
    Write-Host "ERROR: package.json not found." -ForegroundColor Red
    Write-Host "Open the terminal in your Next.js project root and run the script again."
    exit 1
}

$folders = @(
    "public\images\hero",
    "public\images\properties",
    "public\images\projects",
    "public\images\locations",
    "public\images\lifestyles",
    "public\images\amenities",
    "public\images\agents",
    "public\images\testimonials",
    "public\images\footer",
    "public\videos",
    "public\models",
    "public\textures",
    "public\icons",

    "src\app\properties\[slug]",
    "src\app\projects\[slug]",
    "src\app\locations\[slug]",
    "src\app\agents\[slug]",
    "src\app\favourites",
    "src\app\compare",
    "src\app\consultation",
    "src\app\list-property",
    "src\app\about",
    "src\app\journal\[slug]",
    "src\app\contact",
    "src\app\api\properties",
    "src\app\api\consultation",
    "src\app\api\contact",

    "src\components\layout",
    "src\components\navbar",
    "src\components\hero",
    "src\components\three",
    "src\components\residences",
    "src\components\properties",
    "src\components\building-journey",
    "src\components\lifestyle",
    "src\components\projects",
    "src\components\locations",
    "src\components\amenities",
    "src\components\stats",
    "src\components\agents",
    "src\components\consultation",
    "src\components\testimonials",
    "src\components\journal",
    "src\components\footer",
    "src\components\ui",

    "src\data",
    "src\types",
    "src\hooks",
    "src\lib",
    "src\animations",
    "src\utils",
    "src\styles"
)

$componentFiles = @(
    "src\components\layout\SiteLayout.tsx",
    "src\components\layout\SmoothScroll.tsx",
    "src\components\layout\PageTransition.tsx",
    "src\components\layout\ScrollToTop.tsx",

    "src\components\navbar\Navbar.tsx",
    "src\components\navbar\DesktopMenu.tsx",
    "src\components\navbar\MobileMenu.tsx",
    "src\components\navbar\NavActions.tsx",
    "src\components\navbar\SearchModal.tsx",

    "src\components\hero\Hero.tsx",
    "src\components\hero\HeroVideo.tsx",
    "src\components\hero\HeroContent.tsx",
    "src\components\hero\HeroSearch.tsx",
    "src\components\hero\HeroBuilding.tsx",
    "src\components\hero\HeroParallax.tsx",
    "src\components\hero\HeroSpotlight.tsx",
    "src\components\hero\FloatingPropertyCard.tsx",
    "src\components\hero\HeroStats.tsx",
    "src\components\hero\ScrollIndicator.tsx",

    "src\components\three\BuildingCanvas.tsx",
    "src\components\three\BuildingModel.tsx",
    "src\components\three\SceneLights.tsx",
    "src\components\three\CameraRig.tsx",
    "src\components\three\FloatingParticles.tsx",
    "src\components\three\GlobeScene.tsx",

    "src\components\residences\ResidencesSection.tsx",
    "src\components\residences\ResidenceCard.tsx",
    "src\components\residences\ResidenceSlider.tsx",

    "src\components\properties\PropertyGrid.tsx",
    "src\components\properties\PropertyCard.tsx",
    "src\components\properties\PropertyFilters.tsx",
    "src\components\properties\PropertyGallery.tsx",
    "src\components\properties\PropertyOverview.tsx",
    "src\components\properties\PropertyAmenities.tsx",
    "src\components\properties\PropertyMap.tsx",
    "src\components\properties\PropertyAgent.tsx",
    "src\components\properties\PropertySidebar.tsx",
    "src\components\properties\SimilarProperties.tsx",

    "src\components\building-journey\BuildingJourney.tsx",
    "src\components\building-journey\JourneyScene.tsx",
    "src\components\building-journey\JourneySteps.tsx",

    "src\components\lifestyle\LifestyleSection.tsx",
    "src\components\lifestyle\LifestyleCard.tsx",

    "src\components\projects\FeaturedProject.tsx",
    "src\components\projects\ProjectCard.tsx",
    "src\components\projects\ProjectSlider.tsx",
    "src\components\projects\ProjectHero.tsx",
    "src\components\projects\ProjectGallery.tsx",
    "src\components\projects\ProjectTimeline.tsx",

    "src\components\locations\LocationsSection.tsx",
    "src\components\locations\LocationCard.tsx",
    "src\components\locations\LocationSwitcher.tsx",

    "src\components\amenities\AmenitiesSection.tsx",
    "src\components\amenities\AmenityCard.tsx",

    "src\components\stats\StatsSection.tsx",
    "src\components\stats\StatCounter.tsx",

    "src\components\agents\AgentsSection.tsx",
    "src\components\agents\AgentCard.tsx",

    "src\components\consultation\ConsultationSection.tsx",
    "src\components\consultation\ConsultationForm.tsx",
    "src\components\consultation\FloatingAdvisorCard.tsx",

    "src\components\testimonials\Testimonials.tsx",
    "src\components\testimonials\TestimonialCard.tsx",

    "src\components\journal\JournalSection.tsx",
    "src\components\journal\ArticleCard.tsx",

    "src\components\footer\Footer.tsx",
    "src\components\footer\FooterLogo.tsx",
    "src\components\footer\FooterLinks.tsx",
    "src\components\footer\Newsletter.tsx",
    "src\components\footer\FooterBackground.tsx",

    "src\components\ui\Container.tsx",
    "src\components\ui\SectionHeading.tsx",
    "src\components\ui\LuxuryButton.tsx",
    "src\components\ui\MagneticButton.tsx",
    "src\components\ui\GlassCard.tsx",
    "src\components\ui\AnimatedText.tsx",
    "src\components\ui\Reveal.tsx",
    "src\components\ui\ParallaxImage.tsx",
    "src\components\ui\CustomCursor.tsx",
    "src\components\ui\Preloader.tsx",
    "src\components\ui\Badge.tsx",
    "src\components\ui\IconButton.tsx",
    "src\components\ui\NoiseOverlay.tsx"
)

$pageFiles = @(
    "src\app\properties\page.tsx",
    "src\app\properties\[slug]\page.tsx",
    "src\app\projects\page.tsx",
    "src\app\projects\[slug]\page.tsx",
    "src\app\locations\page.tsx",
    "src\app\locations\[slug]\page.tsx",
    "src\app\agents\page.tsx",
    "src\app\agents\[slug]\page.tsx",
    "src\app\favourites\page.tsx",
    "src\app\compare\page.tsx",
    "src\app\consultation\page.tsx",
    "src\app\list-property\page.tsx",
    "src\app\about\page.tsx",
    "src\app\journal\page.tsx",
    "src\app\journal\[slug]\page.tsx",
    "src\app\contact\page.tsx"
)

$tsFiles = @(
    "src\components\navbar\navData.ts",
    "src\components\residences\residenceData.ts",
    "src\components\building-journey\journeyData.ts",
    "src\components\lifestyle\lifestyleData.ts",
    "src\components\projects\projectData.ts",
    "src\components\locations\locationData.ts",
    "src\components\amenities\amenityData.ts",
    "src\components\stats\statsData.ts",
    "src\components\agents\agentData.ts",
    "src\components\testimonials\testimonialData.ts",
    "src\components\journal\journalData.ts",

    "src\data\properties.ts",
    "src\data\projects.ts",
    "src\data\residences.ts",
    "src\data\locations.ts",
    "src\data\lifestyles.ts",
    "src\data\amenities.ts",
    "src\data\agents.ts",
    "src\data\testimonials.ts",
    "src\data\navigation.ts",

    "src\types\property.ts",
    "src\types\project.ts",
    "src\types\location.ts",
    "src\types\agent.ts",
    "src\types\navigation.ts",
    "src\types\common.ts",

    "src\hooks\useMousePosition.ts",
    "src\hooks\useMouseParallax.ts",
    "src\hooks\useScrollDirection.ts",
    "src\hooks\useMediaQuery.ts",
    "src\hooks\useMagnetic.ts",
    "src\hooks\useLenis.ts",
    "src\hooks\useMounted.ts",

    "src\lib\motion.ts",
    "src\lib\gsap.ts",
    "src\lib\lenis.ts",
    "src\lib\fonts.ts",
    "src\lib\metadata.ts",
    "src\lib\validations.ts",

    "src\animations\variants.ts",
    "src\animations\transitions.ts",
    "src\animations\textAnimations.ts",
    "src\animations\scrollAnimations.ts",
    "src\animations\gsapAnimations.ts",

    "src\utils\cn.ts",
    "src\utils\formatPrice.ts",
    "src\utils\formatNumber.ts",
    "src\utils\getPropertyBySlug.ts",
    "src\utils\constants.ts"
)

$cssFiles = @(
    "src\styles\animations.css",
    "src\styles\utilities.css",
    "src\styles\three.css"
)

$routeFiles = @(
    "src\app\api\properties\route.ts",
    "src\app\api\consultation\route.ts",
    "src\app\api\contact\route.ts"
)

function New-FolderSafe {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        New-Item -Path $Path -ItemType Directory -Force | Out-Null
        Write-Host "  + folder  $Path" -ForegroundColor DarkGreen
    }
}

function New-FileSafe {
    param(
        [string]$Path,
        [string]$Content
    )

    if (-not (Test-Path $Path)) {
        $parent = Split-Path $Path -Parent

        if ($parent -and -not (Test-Path $parent)) {
            New-Item -Path $parent -ItemType Directory -Force | Out-Null
        }

        Set-Content -Path $Path -Value $Content -Encoding UTF8
        Write-Host "  + file    $Path" -ForegroundColor DarkCyan
    }
    else {
        Write-Host "  = skipped $Path" -ForegroundColor DarkGray
    }
}

foreach ($folder in $folders) {
    New-FolderSafe $folder
}

foreach ($file in $componentFiles) {
    $componentName = [System.IO.Path]::GetFileNameWithoutExtension($file)

    $content = @"
export default function $componentName() {
  return null;
}
"@

    New-FileSafe $file $content
}

foreach ($file in $pageFiles) {
    $parentName = Split-Path (Split-Path $file -Parent) -Leaf
    $title = if ($parentName -eq "[slug]") { "Details" } else {
        $leaf = Split-Path $file -Parent | Split-Path -Leaf
        (Get-Culture).TextInfo.ToTitleCase($leaf.Replace("-", " "))
    }

    $content = @"
export default function Page() {
  return (
    <main className="min-h-screen bg-[#070907] text-white">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <h1 className="text-5xl">$title</h1>
      </div>
    </main>
  );
}
"@

    New-FileSafe $file $content
}

foreach ($file in $tsFiles) {
    New-FileSafe $file "export {};"
}

foreach ($file in $cssFiles) {
    New-FileSafe $file "/* NestVille styles */"
}

foreach ($file in $routeFiles) {
    $content = @"
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
  });
}
"@

    New-FileSafe $file $content
}

New-FileSafe "src\app\loading.tsx" @'
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070907] text-white">
      Loading NestVille...
    </div>
  );
}
'@

New-FileSafe "src\app\not-found.tsx" @'
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#070907] text-white">
      <h1 className="text-7xl">404</h1>
      <p className="text-white/60">This residence could not be found.</p>
      <Link href="/" className="rounded-full border border-white/20 px-6 py-3">
        Return Home
      </Link>
    </main>
  );
}
'@

New-FileSafe "src\app\error.tsx" @'
"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#070907] text-white">
      <h1 className="text-5xl">Something went wrong</h1>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-white/20 px-6 py-3"
      >
        Try again
      </button>
    </main>
  );
}
'@

Write-Host ""
Write-Host "NestVille structure created successfully." -ForegroundColor Green
Write-Host "Existing files were not overwritten." -ForegroundColor Yellow
Write-Host ""
Write-Host "Next command:" -ForegroundColor Cyan
Write-Host "npm run dev" -ForegroundColor White