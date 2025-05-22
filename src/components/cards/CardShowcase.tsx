
import React from 'react';
import NewsCard from './NewsCard';
import MatchCard from './MatchCard';
import HotelCard from './HotelCard';
import TransportCard from './TransportCard';
import TourCard from './TourCard';
import { ASSETS } from '@/assets';

const CardShowcase = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Card Components</h2>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">News Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            id="news-1"
            title="Morocco Unveils Final Stadium Designs for World Cup 2030"
            summary="The organizing committee has revealed the final designs for all six stadiums that will host matches during the 2030 FIFA World Cup in Morocco."
            image="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80"
            date="2025-03-15"
            category="Infrastructure"
            author="Mohammed El Fassi"
          />
          <NewsCard
            id="news-2"
            title="FIFA Praises Morocco's World Cup Preparations"
            summary="FIFA officials have expressed satisfaction with Morocco's progress in preparing for the 2030 World Cup, citing significant infrastructure development."
            image="https://images.unsplash.com/photo-1556634202-129a046351c0?w=800&q=80"
            date="2025-04-02"
            category="Official"
            author="Sarah Johnson"
          />
          <NewsCard
            id="news-3"
            title="Transportation Network Expansion on Track for 2030"
            summary="Morocco's ambitious transportation expansion project is proceeding on schedule, with high-speed rail connections between all host cities."
            image="https://images.unsplash.com/photo-1568436297096-505935a5c843?w=800&q=80"
            date="2025-04-10"
            category="Infrastructure"
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Match Schedule Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MatchCard
            id="match-1"
            team1="Morocco"
            team2="Spain"
            date="June 10, 2030"
            time="18:00"
            venue="Grand Stade de Casablanca"
            city="Casablanca"
            stage="Group Stage"
            group="Group A"
            isFavorite={true}
            onToggleFavorite={() => {}}
          />
          <MatchCard
            id="match-2"
            team1="Portugal"
            team2="Qualifier B2"
            date="June 11, 2030"
            time="15:00"
            venue="Stade de Marrakech"
            city="Marrakech"
            stage="Group Stage"
            group="Group B"
            onToggleFavorite={() => {}}
          />
          <MatchCard
            id="match-3"
            team1="Qualifier C1"
            team2="Qualifier C2"
            date="June 13, 2030"
            time="18:00"
            venue="Grand Stade de Tanger"
            city="Tangier"
            stage="Round of 16"
            onToggleFavorite={() => {}}
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Hotel Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HotelCard
            id="hotel-1"
            name="Royal Mansour Marrakech"
            image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
            rating={5}
            location="Marrakech, Morocco"
            price={350}
            amenities={["Free WiFi", "Pool", "Spa", "Restaurant"]}
            distance="2.5km"
          />
          <HotelCard
            id="hotel-2"
            name="Four Seasons Casablanca"
            image="https://images.unsplash.com/photo-1551016043-06f0aeffa4e2?w=800&q=80"
            rating={4}
            location="Casablanca, Morocco"
            price={280}
            amenities={["Breakfast", "Parking", "Gym", "Bar"]}
            distance="1.8km"
          />
          <HotelCard
            id="hotel-3"
            name="Kasbah Tamadot"
            image="https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80"
            rating={5}
            location="Atlas Mountains, Morocco"
            price={420}
            amenities={["Mountain View", "Pool", "Luxury", "Restaurant"]}
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Transportation Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TransportCard
            id="transport-1"
            type="bus"
            title="Stadium Express Bus"
            image="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"
            from="Casablanca City Center"
            to="Grand Stade de Casablanca"
            duration="30 min"
            price={10}
            frequency="Every 15 minutes"
          />
          <TransportCard
            id="transport-2"
            type="train"
            title="High-Speed Rail"
            image="https://images.unsplash.com/photo-1589996448606-27d32a110ba1?w=800&q=80"
            from="Rabat"
            to="Tangier"
            duration="2 hours"
            price={35}
            departureTime="08:00, 12:00, 16:00"
          />
          <TransportCard
            id="transport-3"
            type="shuttle"
            title="Airport Transfer"
            image="https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&q=80"
            from="Marrakech Airport"
            to="City Hotels"
            duration="20-45 min"
            price={15}
            frequency="On arrival"
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-4">Tour Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TourCard
            id="tour-1"
            title="Medina of Fez Guided Tour"
            image="https://images.unsplash.com/photo-1548017068-6c8c2ed6cd2a?w=800&q=80"
            location="Fez, Morocco"
            duration="4 hours"
            price={45}
            rating={4.8}
            tags={["UNESCO", "Cultural", "Walking"]}
            dateOptions={["June 12, 2030", "June 15, 2030", "June 19, 2030"]}
          />
          <TourCard
            id="tour-2"
            title="Sahara Desert Experience"
            image="https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=80"
            location="Merzouga, Morocco"
            duration="2 days"
            price={195}
            rating={4.9}
            tags={["Adventure", "Overnight", "Nature"]}
            dateOptions={["June 20-22, 2030", "June 25-27, 2030"]}
          />
          <TourCard
            id="tour-3"
            title="Moroccan Cuisine Workshop"
            image="https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=800&q=80"
            location="Marrakech, Morocco"
            duration="3 hours"
            price={65}
            rating={4.7}
            tags={["Food", "Cooking", "Cultural"]}
            dateOptions={["June 14, 2030", "June 17, 2030", "June 21, 2030"]}
          />
        </div>
      </section>
    </div>
  );
};

export default CardShowcase;
