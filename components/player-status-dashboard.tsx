"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import Depth_Chart from "@/components/depth-chart";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { PlayerCard } from "@/components/player-card";
import type { Player, DepthChart } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface PlayerStatusDashboardProps {
  players: Player[];
  depthChart?: DepthChart[] | null;
}



export function PlayerStatusDashboard({ players, depthChart }: PlayerStatusDashboardProps) {
  function BottomStuff() {
    return (
      <>

        {/* Depth Chart Section */}
        <div ref={depthChartRef} className="pt-32">
          <Depth_Chart depthChart={depthChart} />
        </div>
        {/* Cosmo Feature Section */}
        <div className="bg-[#002E5D]/5 dark:bg-[#002E5D]/10 py-12 my-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/cosmo.png"
                  alt="Cosmo the Cougar"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-[#002E5D] dark:text-blue-400 mb-4">
                  BYU Basketball: Big 12 Ready
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  The Cougars are making their mark in the Big 12 Conference. With
                  a strong roster of talented players, BYU basketball is poised
                  for success in one of college basketball's most competitive
                  conferences.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  As the 2025-26 season approaches, fans are eager to see which
                  players will commit to the program and which might explore
                  opportunities elsewhere. Stay updated with our roster tracker to
                  follow all the latest player status changes.
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <Image
                    src="/images/byu-logo.png"
                    alt="BYU Logo"
                    width={60}
                    height={60}
                  />
                  <div className="h-12 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
                  <Image
                    src="/images/big-12-byu.png"
                    alt="Big 12 Logo"
                    width={80}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rosterFilterRef = useRef<HTMLDivElement>(null);
  const exitingFilterRef = useRef<HTMLDivElement>(null);
  const depthChartRef = useRef<HTMLDivElement>(null); // Add this line to create a ref for the Depth Chart tab

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);

    // Set initial mobile state
    handleResize();

    // Add event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');

    const scrollMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      rosterfilter: rosterFilterRef,
      exitingfilter: exitingFilterRef,
      depthchart: depthChartRef,
    };

    const targetRef = scrollMap[hash];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]); // rerun when URL change

  // Filter players by status categories
  // Roster categories
  const currentPlayers = players.filter(
    (p) => !["graduated", "transfer", "nbaDraft", "transferred", "formerWalkOn"].includes(p.status)
  );
  const exitingPlayers = players.filter(
    (p) => ["graduated", "transfer", "nbaDraft", "transferred", "formerWalkOn"].includes(p.status)
  )

  const committedPlayers = players.filter((p) => ["committed", "projected"].includes(p.status))
  const returningPlayers = players.filter((p) => ["returning", "likely"].includes(p.status))
  const unconfirmedPlayers = players.filter((p) => p.status === "unconfirmed");

  // Exiting players categories
  const graduatedPlayers = players.filter((p) => p.status === "graduated");
  const nbaDraftPlayers = players.filter((p) => p.status === "nbaDraft");
  const transferredPlayers = players.filter((p) => ["transfer", "transferred", "formerWalkOn"].includes(p.status))

  // No longer need filteredPlayers since we're using tabs for filtering

  const statusCounts = {
    committed: committedPlayers.length,
    transfer: transferredPlayers.length,
    undecided: unconfirmedPlayers.length,
    graduated: graduatedPlayers.length,
    nbaDraft: nbaDraftPlayers.length,
    returning: returningPlayers.length,
  };



  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#002E5D]/80 dark:from-[#001a33]/80 to-[#002E5D]/95 dark:to-[#001a33]/95 z-10"></div>
        <Image
          src="/images/byu-basketball-court.jpg"
          alt="BYU Basketball Court"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
          <div className="flex items-center gap-8 mb-8">
            <Image
              src="/images/byu-logo.png"
              alt="BYU Logo"
              width={150}
              height={150}
              className="drop-shadow-lg"
            />
            <div className="h-20 w-0.5 bg-white/30"></div>
            <Image
              src="/images/big-12-byu.png"
              alt="Big 12 Logo"
              width={130}
              height={80}
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 drop-shadow-md">
            Unofficial BYU Basketball Roster
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow">
            2025-26 Season Outlook
          </p>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/70" />
          </div>
        </div>
      </div>
      <Tabs defaultValue="roster">
        {/* Sticky Header */}
        <div
          className={`sticky top-0 z-30 w-full bg-[#002E5D] dark:bg-[#001a33] text-white transition-all duration-300 ${isScrolled ? "py-2 shadow-lg" : "py-4"
            }`}
        >
          <div className="container mx-0 px-2 md:mx-auto md:px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 w-1/3">
              <Image
                src="/images/byu-logo.png"
                alt="BYU Logo"
                width={isMobile ? 40 : isScrolled ? 40 : 50}
                height={isMobile ? 40 : isScrolled ? 40 : 50}
                className="transition-all duration-300"
              />
              <h2
                className={`font-bold transition-all duration-300 ${isScrolled ? "text-xs" : "text-md"
                  }`}
              >
                Cougar Basketball
              </h2>
            </div>
            <div className="w-1/3">
              <TabsList className="w-full">
                <TabsTrigger
                  className="text-white w-1/2"
                  onClick={() => rosterFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} // Add this line to scroll to the top of the Exiting tab when clicking on the Roster tab
                  value="roster">Roster</TabsTrigger>
                <TabsTrigger
                  className="text-white w-1/2"
                  onClick={() => exitingFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} // Add this line to scroll to the top of the Exiting tab when clicking on the Roster tab
                  value="exiting">Exiting</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex items-center gap-3 w-1/3 justify-end">
              <Image
                src="/images/big-12-byu.png"
                alt="Big 12 Logo"
                width={isMobile ? 60 : isScrolled ? 60 : 70}
                height={isMobile ? 30 : isScrolled ? 30 : 35}
                className="transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <TabsContent value="roster">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-[#002E5D] dark:text-blue-400">
                  2025-26 Roster Outlook
                </h2>
                <p ref={rosterFilterRef} className="text-muted-foreground">
                  Players expected to be on next season's roster
                </p>
              </div>
            </div>

            {/* Roster Sub-tabs */}
            <Tabs defaultValue="all" className="">
              <div className="sticky top-[55px] z-30 bg-background border-b">
                <TabsList className="my-5">
                  <TabsTrigger value="all" onClick={() => rosterFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>All ({currentPlayers.length})</TabsTrigger>
                  <TabsTrigger value="committed" onClick={() => rosterFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Incoming ({committedPlayers.length})</TabsTrigger>
                  <TabsTrigger value="returning" onClick={() => rosterFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Returning ({returningPlayers.length})</TabsTrigger>
                  <TabsTrigger value="unconfirmed" onClick={() => rosterFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Unconfirmed ({unconfirmedPlayers.length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="committed">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {committedPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="returning">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {returningPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unconfirmed">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {unconfirmedPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>
              <BottomStuff />
            </Tabs>
          </div>
        </TabsContent>


        <TabsContent value="exiting">

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#002E5D] dark:text-blue-400">
                Exiting Players
              </h2>
              <p ref={exitingFilterRef} className="text-muted-foreground">
                Players who are leaving or have left the program
              </p>
            </div>



            {/* Exiting Sub-tabs */}
            <Tabs defaultValue="all" className="">
              <div className="sticky top-[55px] z-30 bg-background border-b">
                <TabsList className="my-5">
                  <TabsTrigger value="all" onClick={() => exitingFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>All ({exitingPlayers.length})</TabsTrigger>
                  <TabsTrigger value="graduated" onClick={() => exitingFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Graduated ({graduatedPlayers.length})</TabsTrigger>
                  <TabsTrigger value="nbaDraft" onClick={() => exitingFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>NBA Draft ({nbaDraftPlayers.length})</TabsTrigger>
                  <TabsTrigger value="transferred" onClick={() => exitingFilterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Transferring ({transferredPlayers.length})</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {exitingPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>


              <TabsContent value="graduated">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {graduatedPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nbaDraft">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {nbaDraftPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transferred">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {transferredPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>

              <BottomStuff />
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}
