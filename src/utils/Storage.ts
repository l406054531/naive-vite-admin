// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;
/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = (prefixKey = '', storage = localStorage) => {

  class Storage {
    private storage = storage;
    private prefixKey?: string = prefixKey;

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }
    /**
     * @description 设置缓存
     * @param key  缓存键
     * @param value  缓存值
     * @param expire  过期时间
     */
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify(
        {
          value,
          expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
        }
      )
      this.storage.setItem(this.getKey(key), stringData);
    }
  }
}