<a name="2.0.2"></a>
## [2.0.2](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.6...v2.0.2) (2017-01-10)


### Breaking

* Removed path selecteor and any RAML processing from the element. Now the element expect to get the data from the outside. The base reason is performance. An app will most prabobly need to use path selector and raml-path-to-object elements more than once if it is included in many elements and when the path changin all of this elements would perform a comutation. New version prohibits this behavior but the data must be provided to it ([c4e0fbb11c42692ddf189c62059874d2f0ad3bda](https://github.com/advanced-rest-client/raml-documentation-panel/commit/c4e0fbb11c42692ddf189c62059874d2f0ad3bda))

### Update

* Updated element to work with new parser output ([c00c538273b2002fa7f083814c5c0fa8e2c6bfe3](https://github.com/advanced-rest-client/raml-documentation-panel/commit/c00c538273b2002fa7f083814c5c0fa8e2c6bfe3))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.6...v2.0.1) (2016-12-22)


### Breaking

* Removed path selecteor and any RAML processing from the element. Now the element expect to get the data from the outside. The base reason is performance. An app will most prabobly need to use path selector and raml-path-to-object elements more than once if it is included in many elements and when the path changin all of this elements would perform a comutation. New version prohibits this behavior but the data must be provided to it ([c4e0fbb11c42692ddf189c62059874d2f0ad3bda](https://github.com/advanced-rest-client/raml-documentation-panel/commit/c4e0fbb11c42692ddf189c62059874d2f0ad3bda))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.4...v1.0.6) (2016-12-22)


### Docs

* Updated documentation for method ([f100692ced60e47ac1256187bc171314912a74fe](https://github.com/advanced-rest-client/raml-documentation-panel/commit/f100692ced60e47ac1256187bc171314912a74fe))

### Fix

* Fixed styles definitions ([a5a788d0fceebd8307f14b4a1a30dfdf3547890c](https://github.com/advanced-rest-client/raml-documentation-panel/commit/a5a788d0fceebd8307f14b4a1a30dfdf3547890c))

### New

* Added media queries and movile view ([6d95d14ef35e3e7fc8cb105d87b65e73fd07426b](https://github.com/advanced-rest-client/raml-documentation-panel/commit/6d95d14ef35e3e7fc8cb105d87b65e73fd07426b))
* Added test cases ([5f3edcab61c0bd819bbf7a13c6231f3da448bb4b](https://github.com/advanced-rest-client/raml-documentation-panel/commit/5f3edcab61c0bd819bbf7a13c6231f3da448bb4b))

### Update

* Updated demo page ([7d31de03722aed79ad799752b96bcadd43c9fb37](https://github.com/advanced-rest-client/raml-documentation-panel/commit/7d31de03722aed79ad799752b96bcadd43c9fb37))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.4...v1.0.5) (2016-12-16)


### Docs

* Updated documentation for method ([f100692ced60e47ac1256187bc171314912a74fe](https://github.com/advanced-rest-client/raml-documentation-panel/commit/f100692ced60e47ac1256187bc171314912a74fe))

### Fix

* Fixed styles definitions ([a5a788d0fceebd8307f14b4a1a30dfdf3547890c](https://github.com/advanced-rest-client/raml-documentation-panel/commit/a5a788d0fceebd8307f14b4a1a30dfdf3547890c))

### New

* Added media queries and movile view ([6d95d14ef35e3e7fc8cb105d87b65e73fd07426b](https://github.com/advanced-rest-client/raml-documentation-panel/commit/6d95d14ef35e3e7fc8cb105d87b65e73fd07426b))
* Added test cases ([5f3edcab61c0bd819bbf7a13c6231f3da448bb4b](https://github.com/advanced-rest-client/raml-documentation-panel/commit/5f3edcab61c0bd819bbf7a13c6231f3da448bb4b))

### Update

* Updated demo page ([7d31de03722aed79ad799752b96bcadd43c9fb37](https://github.com/advanced-rest-client/raml-documentation-panel/commit/7d31de03722aed79ad799752b96bcadd43c9fb37))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.3...v1.0.4) (2016-12-09)




<a name="1.0.3"></a>
## [1.0.3](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.2...v1.0.3) (2016-12-08)


### Update

* Some element's attributes will not notify change ([4bb31d6a1d69b27d3d6ffca388f489dc4dea8391](https://github.com/advanced-rest-client/raml-documentation-panel/commit/4bb31d6a1d69b27d3d6ffca388f489dc4dea8391))
* Updated element to use new CI ([f67c90786e317129a8f6016047791149c9a5f901](https://github.com/advanced-rest-client/raml-documentation-panel/commit/f67c90786e317129a8f6016047791149c9a5f901))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/advanced-rest-client/raml-documentation-panel/compare/1.0.1...v1.0.2) (2016-11-18)


### New

* Added aware property. The element is now able to use the raml-aware element ([63fe72c62385c1c1bd7c7bc976a1ddc5cc8c9fd9](https://github.com/advanced-rest-client/raml-documentation-panel/commit/63fe72c62385c1c1bd7c7bc976a1ddc5cc8c9fd9))



<a name="1.0.1"></a>
## 1.0.1 (2016-11-15)


### Update

* Updated element to new structure ([3e8c1deaaacedd95a7bb4046812cce0c0da99728](https://github.com/advanced-rest-client/raml-documentation-panel/commit/3e8c1deaaacedd95a7bb4046812cce0c0da99728))



