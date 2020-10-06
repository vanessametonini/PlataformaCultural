<template>
  <div class="line" />
</template>

<style lang="scss" scoped>
$colors: ( #683931,
    #AD3B3B,
    #C95B40,
    #DBB753,
    #E6B545,
    #529E63,
    #49833A,
    #254C26,
    #2F5497,
    #4692C1,
    #86BCD3,
    #D3869B,
    #CB6883,
    #C44B6E,
    #BD6A5C,
    #AD3B3B,
    #653830,
    #C95B40);

@mixin stripes($direction, $colors) {
  $length: length($colors);

  @if $length > 1 {
    $stripes: ();

    @for $i from 1 through $length {
      $stripe: (100% / $length) * ($i - 1);

      @if $i > 1 {
        $previous-color: nth($colors, $i - 1);
        $stripes: append($stripes, $previous-color $stripe, comma);
      }

      $stripes: append($stripes, nth($colors, $i) $stripe, comma);
    }
    background-image: linear-gradient($direction, $stripes);
  } @else if $length == 1 {
    background-color: $colors;
  }
}

.line {
  height: 3px;
  width: 100%;
  @include stripes(to right, $colors);
}

</style>
