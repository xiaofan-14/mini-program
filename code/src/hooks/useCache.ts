// utils/useCache.ts
interface CacheItem<T> {
  value: T;
  expireAt?: number; // 过期时间戳（ms）
}

export function useCache() {
  /**
   * 设置缓存
   */
  function set<T>(key: string, value: T, expireSeconds?: number) {
    const item: CacheItem<T> = {
      value,
      expireAt: expireSeconds ? Date.now() + expireSeconds * 1000 : undefined,
    };
    wx.setStorageSync(key, JSON.stringify(item));
  }

  /**
   * 获取缓存（自动检查过期）
   */
  function get<T>(key: string): T | null {
    try {
      const raw = wx.getStorageSync(key);
      if (!raw) return null;

      const item: CacheItem<T> = JSON.parse(raw);
      if (item.expireAt && Date.now() > item.expireAt) {
        wx.removeStorageSync(key);
        return null;
      }

      return item.value;
    } catch (err) {
      console.error('getCache error:', err);
      return null;
    }
  }

  /**
   * 删除缓存
   */
  function remove(key: string) {
    wx.removeStorageSync(key);
  }

  /**
   * 清空缓存
   */
  function clear() {
    wx.clearStorageSync();
  }

  return { setCache: set, getCache: get, remove, clear };
}
