"use client";

import React, { useState, useEffect, Suspense } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

function EventList() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get("tag");
  const artistQuery = searchParams.get("artist");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://qevent-backend.labs.crio.do/events"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventData = await response.json();

        let filteredEvents = eventData;

        if (tagQuery) {
          filteredEvents = eventData.filter(
            (event) => event.tags && event.tags.includes(tagQuery)
          );
        } else if (artistQuery) {
          filteredEvents = eventData.filter(
            (event) =>
              event.artist &&
              typeof event.artist === "string" &&
              event.artist.toLowerCase() === artistQuery.toLowerCase()
          );
        }

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [tagQuery, artistQuery]);

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {events.length > 0 ? (
        events.map((eventData) => (
          <EventCard key={eventData.id} eventData={eventData} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No events found</p>
      )}
    </div>
  );
}

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <EventList />
    </Suspense>
  );
}