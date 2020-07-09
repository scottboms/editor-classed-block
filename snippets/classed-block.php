<?php if($attrs->element()->isNotEmpty()): ?><<?= $attrs->element() ?><?php if($attrs->css()->isNotEmpty()): ?> class="<?= $attrs->css() ?>"<?php endif ?>><?php endif ?>
  <?= smartypants($content->kirbytext()) ?>
<?php if($attrs->element()->isNotEmpty()): ?></<?= $attrs->element() ?>><?php endif ?>