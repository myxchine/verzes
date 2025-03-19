"use server";
import { db } from "@/server/db";
import { workouts, likes, users } from "@/server/db/schema";
import { desc, sql, eq, and } from "drizzle-orm";
import type { workout, workoutWithuserName } from "@/server/db/schema";

export async function getworkoutsByuser(
  userId: string
): Promise<workoutWithuserName[]> {
  try {
    const res = await db
      .select()
      .from(workouts)
      .innerJoin(users, eq(workouts.userId, users.id))
      .where(eq(workouts.userId, userId))
      .orderBy(desc(workouts.createdAt))
      .limit(100);

    return res.map((object) => ({
      ...object.workout,
      userName: object.user.name,
    }));
  } catch (error) {
    console.error("Error getting workouts by user:", error);
    return [];
  }
}
export async function getworkoutById(
  workoutId: string
): Promise<workout | null> {
  try {
    const res = await db
      .select()
      .from(workouts)
      .where(eq(workouts.id, workoutId))
      .limit(1);
    if (!res) throw new Error("No workouts found");
    return res[0];
  } catch (error) {
    console.error("Error getting workout by fileUrl:", error);
    return null;
  }
}

export async function getworkouts(): Promise<workout[]> {
  try {
    const res = await db
      .select()
      .from(workouts)
      .orderBy(desc(workouts.createdAt))
      .limit(60);
    if (!res) throw new Error("No workouts found");
    return res;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export async function getLikedworkouts(
  userId: string
): Promise<workoutWithuserName[]> {
  try {
    const res = await db
      .select()
      .from(workouts)
      .where(eq(likes.userId, userId))
      .innerJoin(users, eq(workouts.userId, users.id))
      .orderBy(desc(workouts.createdAt))
      .limit(60);
    if (!res) throw new Error("No workouts found");
    return res.map((object) => ({
      ...object.workout,
      userName: object.user.name,
    }));
  } catch (error) {
    console.error("Error fetching liked workouts:", error);
    return [];
  }
}
interface LikeStatus {
  likesCount: number;
  isLiked: boolean;
}
export async function getLikeStatus({
  userId,
  workoutId,
}: {
  userId?: string;
  workoutId: string;
}): Promise<LikeStatus> {
  try {
    const result = await db
      .select({
        likesCount: sql<number>`COUNT(${likes.userId})`.as("likes_count"),
        isLiked: userId
          ? sql<boolean>`BOOL_OR(${likes.userId} = ${userId})`.as("is_liked")
          : sql<boolean>`false`.as("is_liked"),
      })
      .from(likes)
      .where(eq(likes.workoutId, workoutId));
    const { likesCount, isLiked } = result[0] || {
      likesCount: 0,
      isLiked: false,
    };
    return { likesCount, isLiked };
  } catch (error) {
    console.error("Error fetching like status:", error);
    return { likesCount: 0, isLiked: false };
  }
}

export async function likeworkout(userId: string, workoutId: string) {
  if (typeof userId !== "string" || typeof workoutId !== "string") {
    console.error("Invalid userId or workoutId");
    return {
      success: false,
      delta: 0,
      message: "Invalid userId or workoutId.",
    };
  }
  try {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.workoutId, workoutId)));
    if (existingLike.length > 0) {
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.workoutId, workoutId)));
      return {
        success: true,
        delta: -1,
        message: "Like removed successfully.",
      };
    }
    await db.insert(likes).values({
      userId,
      workoutId,
    });
    return { success: true, delta: 1, message: "workout liked successfully." };
  } catch (error) {
    console.error("Error toggling like:", error);
    return {
      success: false,
      delta: 0,
      message: "Something went wrong.",
    };
  }
}

export async function getworkout(workoutId: string): Promise<workout | null> {
  try {
    const data = await db
      .select()
      .from(workouts)
      .where(eq(workouts.id, workoutId))
      .limit(1);
    if (!data) return null;
    return data[0];
  } catch (error) {
    console.error("Error fetching workout:", error);
    return null;
  }
}
import { getServerAuthSession } from "@/server/auth";
export async function newworkout({ workoutJson }: { workoutJson: any }) {
  try {
    const session = await getServerAuthSession();

    const workout = await db
      .insert(workouts)
      .values({
        workoutJson,
        userId: session?.user.id,
      })
      .returning();
    return {
      workout: workout[0],
      status: { status: "success", message: "workout created successfully." },
    };
  } catch (error) {
    console.error("Error creating new workout:", error);
    return {
      workout: null,
      status: { status: "error", message: "Failed to create new workout." },
    };
  }
}

export async function deleteworkout({
  workout,
}: {
  workout: workoutWithuserName | workout;
}) {
  try {
    await db.delete(workouts).where(eq(workouts.id, workout.id));
    return { status: "success", message: "workout deleted successfully." };
  } catch (error) {
    console.error("Error deleting workout:", error);
    return { status: "error", message: "Failed to delete workout." };
  }
}
