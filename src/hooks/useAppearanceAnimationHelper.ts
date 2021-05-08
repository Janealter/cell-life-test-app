import { useCallback, useEffect, useRef } from 'react';

const useAppearanceAnimationHelper = (items: unknown[], animationTimeMS: number, offsetPX: number) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const prevItemsLength = useRef<number>(items.length);
  const containerHeightRef = useRef<number>();
  const itemHeightRef = useRef<number>();

  const onContainerMounted = useCallback((container: HTMLElement | null) => {
    if (!container) return;

    containerRef.current = container;

    const containerHeight = window.getComputedStyle(container).height;
    container.style.setProperty('--item-transform-height', containerHeight);
    containerHeightRef.current = parseInt(containerHeight, 10);

    container.style.setProperty('--item-animation-time', `${animationTimeMS}ms`);
    container.style.setProperty('--item-offset', `${offsetPX}px`);
  }, [animationTimeMS, offsetPX]);

  const onItemMounted = useCallback((item: HTMLElement | null) => {
    if (!item) return;

    const itemHeight = window.getComputedStyle(item).height;
    itemHeightRef.current = parseInt(itemHeight, 10);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !containerHeightRef.current || !itemHeightRef.current) return;

    const maxVisibleItemsCount = Math.round(containerHeightRef.current / itemHeightRef.current);

    const newTransformHeight = containerHeightRef.current - (itemHeightRef.current + offsetPX) *
      (prevItemsLength.current < maxVisibleItemsCount ? prevItemsLength.current : maxVisibleItemsCount);

    containerRef.current.style.setProperty(
      '--item-transform-height',
      `${newTransformHeight > itemHeightRef.current ? newTransformHeight : itemHeightRef.current}px`,
    );

    prevItemsLength.current = items.length;
  }, [items, offsetPX]);

  return { onContainerMounted, onItemMounted, containerRef };
};

export default useAppearanceAnimationHelper;
